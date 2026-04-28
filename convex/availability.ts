import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireVet } from "./lib/permissions";

const SLOT_DURATION_MS = 30 * 60 * 1000;

export const openSlot = mutation({
  args: { startsAt: v.number(), endsAt: v.optional(v.number()) },
  returns: v.id("availabilitySlots"),
  handler: async (ctx, args) => {
    const { vet } = await requireVet(ctx);
    const startsAt = args.startsAt;
    const endsAt = args.endsAt ?? startsAt + SLOT_DURATION_MS;
    if (endsAt <= startsAt) {
      throw new ConvexError({
        code: "INVALID_RANGE",
        message: "endsAt must be after startsAt",
      });
    }
    if (startsAt < Date.now()) {
      throw new ConvexError({
        code: "PAST_SLOT",
        message: "No se pueden abrir slots en el pasado",
      });
    }

    // Reject overlap with existing slots for this vet.
    const existing = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_vet_and_start", (q) =>
        q.eq("veterinarianId", vet._id),
      )
      .collect();
    const overlaps = existing.some(
      (s) => s.startsAt < endsAt && s.endsAt > startsAt,
    );
    if (overlaps) {
      throw new ConvexError({
        code: "OVERLAPS",
        message: "El slot solapa con otro existente",
      });
    }

    return await ctx.db.insert("availabilitySlots", {
      veterinarianId: vet._id,
      startsAt,
      endsAt,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

export const removeSlot = mutation({
  args: { slotId: v.id("availabilitySlots") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { vet } = await requireVet(ctx);
    const slot = await ctx.db.get(args.slotId);
    if (!slot || slot.veterinarianId !== vet._id) {
      throw new ConvexError({ code: "NOT_FOUND", message: "Slot no encontrado" });
    }
    if (slot.status === "booked") {
      throw new ConvexError({
        code: "ALREADY_BOOKED",
        message: "No se puede eliminar un slot ya reservado",
      });
    }
    await ctx.db.delete(args.slotId);
    return null;
  },
});

const openSlotItem = v.object({
  _id: v.id("availabilitySlots"),
  startsAt: v.number(),
  endsAt: v.number(),
  veterinarianId: v.id("veterinarians"),
  vetName: v.string(),
  vetSpecialty: v.optional(v.string()),
  vetPhotoUrl: v.optional(v.string()),
});

export const listOpenSlots = query({
  args: { fromTs: v.number(), toTs: v.number() },
  returns: v.array(openSlotItem),
  handler: async (ctx, args) => {
    if (args.toTs <= args.fromTs) return [];
    const rows = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_status_and_start", (q) =>
        q.eq("status", "open").gte("startsAt", args.fromTs),
      )
      .collect();

    const inRange = rows.filter((s) => s.startsAt < args.toTs);
    const vetCache = new Map<string, { name: string; specialty?: string; photo?: string; isActive: boolean }>();

    const out = [];
    for (const s of inRange) {
      const key = String(s.veterinarianId);
      let cached = vetCache.get(key);
      if (!cached) {
        const vet = await ctx.db.get(s.veterinarianId);
        if (!vet) continue;
        cached = {
          name: vet.fullName,
          specialty: vet.specialty,
          photo: vet.photoUrl,
          isActive: vet.isActive,
        };
        vetCache.set(key, cached);
      }
      if (!cached.isActive) continue;
      out.push({
        _id: s._id,
        startsAt: s.startsAt,
        endsAt: s.endsAt,
        veterinarianId: s.veterinarianId,
        vetName: cached.name,
        vetSpecialty: cached.specialty,
        vetPhotoUrl: cached.photo,
      });
    }
    out.sort((a, b) => a.startsAt - b.startsAt);
    return out;
  },
});

export const listMine = query({
  args: { fromTs: v.number(), toTs: v.number() },
  returns: v.array(
    v.object({
      _id: v.id("availabilitySlots"),
      startsAt: v.number(),
      endsAt: v.number(),
      status: v.union(
        v.literal("open"),
        v.literal("booked"),
        v.literal("blocked"),
      ),
      bookingId: v.optional(v.id("bookings")),
    }),
  ),
  handler: async (ctx, args) => {
    const { vet } = await requireVet(ctx);
    if (args.toTs <= args.fromTs) return [];
    const rows = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_vet_and_start", (q) =>
        q.eq("veterinarianId", vet._id).gte("startsAt", args.fromTs),
      )
      .collect();
    return rows
      .filter((s) => s.startsAt < args.toTs)
      .map((s) => ({
        _id: s._id,
        startsAt: s.startsAt,
        endsAt: s.endsAt,
        status: s.status,
        bookingId: s.bookingId,
      }));
  },
});
