import { v, ConvexError } from "convex/values";
import {
  mutation,
  query,
  internalQuery,
  internalMutation,
  type QueryCtx,
  type MutationCtx,
} from "./_generated/server";
import { internal } from "./_generated/api";
import type { Doc } from "./_generated/dataModel";
import { requireHousehold } from "./lib/auth";
import { requireVet } from "./lib/permissions";

const bookingDoc = v.object({
  _id: v.id("bookings"),
  consultationId: v.id("consultations"),
  petId: v.id("pets"),
  petName: v.optional(v.string()),
  veterinarianId: v.id("veterinarians"),
  vetName: v.string(),
  vetSpecialty: v.optional(v.string()),
  scheduledStartAt: v.number(),
  scheduledEndAt: v.number(),
  status: v.union(
    v.literal("confirmed"),
    v.literal("in_progress"),
    v.literal("completed"),
    v.literal("canceled_by_user"),
    v.literal("canceled_by_vet"),
    v.literal("no_show_user"),
    v.literal("no_show_vet"),
  ),
  paymentMode: v.union(
    v.literal("included_in_subscription"),
    v.literal("paid_extra"),
  ),
  dailyRoomUrl: v.optional(v.string()),
  vetNotesAfter: v.optional(v.string()),
  createdAt: v.number(),
  completedAt: v.optional(v.number()),
});

export const create = mutation({
  args: {
    consultationId: v.id("consultations"),
    slotId: v.id("availabilitySlots"),
  },
  returns: v.object({
    bookingId: v.id("bookings"),
    polarCheckoutUrl: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const { user, householdId } = await requireHousehold(ctx);

    const consultation = await ctx.db.get(args.consultationId);
    if (!consultation || consultation.householdId !== householdId) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Consulta no encontrada",
      });
    }
    if (!consultation.petId) {
      throw new ConvexError({
        code: "NO_PET",
        message: "La consulta no tiene mascota asociada",
      });
    }

    const slot = await ctx.db.get(args.slotId);
    if (!slot) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Slot no encontrado",
      });
    }
    if (slot.status !== "open") {
      throw new ConvexError({
        code: "SLOT_TAKEN",
        message: "Ese horario ya no está disponible",
      });
    }

    // Phase 3 stub: every booking is "included_in_subscription" until
    // Phase 4 wires Polar entitlements.
    const bookingId = await ctx.db.insert("bookings", {
      consultationId: args.consultationId,
      petId: consultation.petId,
      requesterUserId: user._id,
      veterinarianId: slot.veterinarianId,
      slotId: args.slotId,
      scheduledStartAt: slot.startsAt,
      scheduledEndAt: slot.endsAt,
      status: "confirmed",
      paymentMode: "included_in_subscription",
      createdAt: Date.now(),
    });

    await ctx.db.patch(args.slotId, { status: "booked", bookingId });
    await ctx.db.patch(args.consultationId, { status: "escalated" });

    // Side-effects: create the Daily room and send the confirmation email.
    await ctx.scheduler.runAfter(
      0,
      internal.dailyRooms.createForBooking,
      { bookingId },
    );
    await ctx.scheduler.runAfter(
      1000,
      internal.email.sendBookingConfirmation,
      { bookingId },
    );
    // Reminder 15 min before start.
    const reminderAt = slot.startsAt - 15 * 60 * 1000;
    if (reminderAt > Date.now()) {
      await ctx.scheduler.runAt(
        reminderAt,
        internal.email.sendBookingReminder,
        { bookingId },
      );
    }

    return { bookingId };
  },
});

async function denormalizeBooking(
  ctx: QueryCtx | MutationCtx,
  b: Doc<"bookings">,
) {
  const pet = await ctx.db.get(b.petId);
  const vet = await ctx.db.get(b.veterinarianId);
  return {
    _id: b._id,
    consultationId: b.consultationId,
    petId: b.petId,
    petName: pet?.name,
    veterinarianId: b.veterinarianId,
    vetName: vet?.fullName ?? "Veterinario",
    vetSpecialty: vet?.specialty,
    scheduledStartAt: b.scheduledStartAt,
    scheduledEndAt: b.scheduledEndAt,
    status: b.status,
    paymentMode: b.paymentMode,
    dailyRoomUrl: b.dailyRoomUrl,
    vetNotesAfter: b.vetNotesAfter,
    createdAt: b.createdAt,
    completedAt: b.completedAt,
  };
}

export const listMine = query({
  args: {},
  returns: v.array(bookingDoc),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return [];
    const rows = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("requesterUserId", user._id))
      .order("desc")
      .collect();
    return await Promise.all(rows.map((b) => denormalizeBooking(ctx, b)));
  },
});

export const listForVet = query({
  args: {},
  returns: v.array(bookingDoc),
  handler: async (ctx) => {
    const { vet } = await requireVet(ctx);
    const rows = await ctx.db
      .query("bookings")
      .withIndex("by_vet", (q) => q.eq("veterinarianId", vet._id))
      .order("desc")
      .collect();
    return await Promise.all(rows.map((b) => denormalizeBooking(ctx, b)));
  },
});

export const get = query({
  args: { bookingId: v.id("bookings") },
  returns: v.union(bookingDoc, v.null()),
  handler: async (ctx, args) => {
    const b = await ctx.db.get(args.bookingId);
    if (!b) return null;
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return null;
    if (b.requesterUserId !== user._id) {
      // Vet can also see their own bookings.
      const vet = await ctx.db
        .query("veterinarians")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .unique();
      if (!vet || vet._id !== b.veterinarianId) return null;
    }
    return await denormalizeBooking(ctx, b);
  },
});

export const cancelByUser = mutation({
  args: { bookingId: v.id("bookings") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { user } = await requireHousehold(ctx);
    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.requesterUserId !== user._id) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Reserva no encontrada" });
    }
    if (
      booking.status === "completed" ||
      booking.status.startsWith("canceled_")
    ) {
      throw new ConvexError({
        code: "INVALID_STATUS",
        message: "Esta reserva ya no se puede cancelar",
      });
    }
    await ctx.db.patch(args.bookingId, { status: "canceled_by_user" });
    await ctx.db.patch(booking.slotId, {
      status: "open",
      bookingId: undefined,
    });
    return null;
  },
});

export const cancelByVet = mutation({
  args: { bookingId: v.id("bookings"), reason: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { vet } = await requireVet(ctx);
    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.veterinarianId !== vet._id) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Reserva no encontrada" });
    }
    if (
      booking.status === "completed" ||
      booking.status.startsWith("canceled_")
    ) {
      throw new ConvexError({
        code: "INVALID_STATUS",
        message: "Esta reserva ya no se puede cancelar",
      });
    }
    await ctx.db.patch(args.bookingId, { status: "canceled_by_vet" });
    await ctx.db.patch(booking.slotId, {
      status: "open",
      bookingId: undefined,
    });
    void args.reason; // TODO: forward to email + audit log when Phase 5 polish lands
    return null;
  },
});

export const markCompleted = mutation({
  args: {
    bookingId: v.id("bookings"),
    notes: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { vet } = await requireVet(ctx);
    const booking = await ctx.db.get(args.bookingId);
    if (!booking || booking.veterinarianId !== vet._id) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Reserva no encontrada" });
    }
    await ctx.db.patch(args.bookingId, {
      status: "completed",
      vetNotesAfter: args.notes?.trim(),
      completedAt: Date.now(),
    });
    await ctx.scheduler.runAfter(
      0,
      internal.email.sendBookingCompleted,
      { bookingId: args.bookingId },
    );
    return null;
  },
});

// Internal — used by dailyRooms / email actions.
export const _internalGet = internalQuery({
  args: { bookingId: v.id("bookings") },
  returns: v.union(
    v.object({
      _id: v.id("bookings"),
      consultationId: v.id("consultations"),
      requesterUserId: v.id("users"),
      veterinarianId: v.id("veterinarians"),
      scheduledStartAt: v.number(),
      scheduledEndAt: v.number(),
      dailyRoomUrl: v.optional(v.string()),
      petId: v.id("pets"),
    }),
    v.null(),
  ),
  handler: async (ctx, args) => {
    const b = await ctx.db.get(args.bookingId);
    if (!b) return null;
    return {
      _id: b._id,
      consultationId: b.consultationId,
      requesterUserId: b.requesterUserId,
      veterinarianId: b.veterinarianId,
      scheduledStartAt: b.scheduledStartAt,
      scheduledEndAt: b.scheduledEndAt,
      dailyRoomUrl: b.dailyRoomUrl,
      petId: b.petId,
    };
  },
});

export const _setDailyRoomUrl = internalMutation({
  args: { bookingId: v.id("bookings"), url: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bookingId, { dailyRoomUrl: args.url });
    return null;
  },
});
