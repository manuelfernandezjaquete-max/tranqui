"use node";

import { Resend } from "resend";
import { v } from "convex/values";
import { internalAction, type ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

const FROM_ADDRESS = "Tranqui <onboarding@resend.dev>";

function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
}

interface BookingEmailContext {
  ownerEmail: string;
  ownerName?: string;
  petName: string;
  vetName: string;
  startsAt: number;
  dailyRoomUrl?: string;
  notes?: string;
}

async function fetchContext(
  ctx: ActionCtx,
  bookingId: Id<"bookings">,
): Promise<BookingEmailContext | null> {
  const b = await ctx.runQuery(internal.bookings._internalGet, {
    bookingId,
  });
  if (!b) return null;
  const owner = await ctx.runQuery(internal.users._internalGet, {
    userId: b.requesterUserId,
  });
  const pet = await ctx.runQuery(internal.pets._internalGetForPrompt, {
    petId: b.petId,
  });
  const vet = await ctx.runQuery(internal.vets._internalGet, {
    veterinarianId: b.veterinarianId,
  });
  if (!owner || !pet || !vet) return null;
  return {
    ownerEmail: owner.email,
    ownerName: owner.name,
    petName: pet.name,
    vetName: vet.fullName,
    startsAt: b.scheduledStartAt,
    dailyRoomUrl: b.dailyRoomUrl,
  };
}

function bookingConfirmedHtml(c: BookingEmailContext): string {
  const greeting = c.ownerName ? `Hola ${c.ownerName},` : "Hola,";
  const link = c.dailyRoomUrl
    ? `<p>Cuando llegue la hora, entra aquí: <a href="${c.dailyRoomUrl}">${c.dailyRoomUrl}</a></p>`
    : `<p>Te enviaremos el enlace de la videoconsulta unos minutos antes.</p>`;
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#2c2a26;line-height:1.6;max-width:560px;">
      <h1 style="font-family:Georgia,serif;color:#5c6f62;">Reserva confirmada</h1>
      <p>${greeting}</p>
      <p>Tu videoconsulta para <strong>${c.petName}</strong> con <strong>${c.vetName}</strong> queda confirmada para el <strong>${formatDateTime(c.startsAt)}</strong>.</p>
      ${link}
      <p style="font-size:13px;color:#6b6862;">Si tienes que cancelar o reprogramar, hazlo desde tu panel en Tranqui.</p>
    </div>
  `;
}

function bookingReminderHtml(c: BookingEmailContext): string {
  const link = c.dailyRoomUrl
    ? `<p style="margin:24px 0;"><a style="background:#e89b7b;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;" href="${c.dailyRoomUrl}">Entrar a la videoconsulta</a></p>`
    : "";
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#2c2a26;line-height:1.6;max-width:560px;">
      <h1 style="font-family:Georgia,serif;color:#5c6f62;">Tu consulta empieza en 15 min</h1>
      <p>Tu videoconsulta para <strong>${c.petName}</strong> con <strong>${c.vetName}</strong> empieza a las <strong>${formatDateTime(c.startsAt)}</strong>.</p>
      ${link}
    </div>
  `;
}

function bookingCompletedHtml(c: BookingEmailContext): string {
  const notes = c.notes
    ? `<p><strong>Notas del veterinario:</strong></p><blockquote style="border-left:3px solid #c7d3cb;padding-left:12px;color:#2c2a26;">${c.notes}</blockquote>`
    : "";
  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#2c2a26;line-height:1.6;max-width:560px;">
      <h1 style="font-family:Georgia,serif;color:#5c6f62;">Consulta completada</h1>
      <p>Gracias por confiar en Tranqui. ${c.vetName} ha cerrado la consulta de ${c.petName}.</p>
      ${notes}
      <p style="font-size:13px;color:#6b6862;">Cualquier duda posterior, abre una nueva consulta en cuanto la necesites.</p>
    </div>
  `;
}

async function send(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing — skipping email.");
    return;
  }
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
  });
  if (result.error) {
    console.error("Resend error:", result.error);
  }
}

export const sendBookingConfirmation = internalAction({
  args: { bookingId: v.id("bookings") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const c = await fetchContext(ctx, args.bookingId);
    if (!c) return null;
    await send(
      c.ownerEmail,
      `Reserva confirmada — ${c.petName} con ${c.vetName}`,
      bookingConfirmedHtml(c),
    );
    return null;
  },
});

export const sendBookingReminder = internalAction({
  args: { bookingId: v.id("bookings") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const c = await fetchContext(ctx, args.bookingId);
    if (!c) return null;
    await send(
      c.ownerEmail,
      `Recordatorio: tu consulta para ${c.petName} empieza en 15 min`,
      bookingReminderHtml(c),
    );
    return null;
  },
});

export const sendBookingCompleted = internalAction({
  args: { bookingId: v.id("bookings") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const c = await fetchContext(ctx, args.bookingId);
    if (!c) return null;
    await send(
      c.ownerEmail,
      `Consulta completada — ${c.petName}`,
      bookingCompletedHtml(c),
    );
    return null;
  },
});
