"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

const DAILY_API_BASE = "https://api.daily.co/v1";

interface DailyRoomResponse {
  url?: string;
  name?: string;
  error?: string;
}

export const createForBooking = internalAction({
  args: { bookingId: v.id("bookings") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.DAILY_API_KEY;
    if (!apiKey) {
      console.error("DAILY_API_KEY missing — skipping Daily room creation.");
      return null;
    }

    const booking = await ctx.runQuery(internal.bookings._internalGet, {
      bookingId: args.bookingId,
    });
    if (!booking) {
      console.error(`Booking ${args.bookingId} not found.`);
      return null;
    }
    if (booking.dailyRoomUrl) return null;

    const expirySec = Math.floor((booking.scheduledEndAt + 30 * 60 * 1000) / 1000);

    try {
      const res = await fetch(`${DAILY_API_BASE}/rooms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            exp: expirySec,
            enable_chat: true,
            enable_screenshare: true,
            start_video_off: false,
            start_audio_off: false,
          },
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error(
          `Daily room creation failed: ${res.status} ${text}`,
        );
        return null;
      }
      const data = (await res.json()) as DailyRoomResponse;
      if (!data.url) {
        console.error("Daily response missing url:", data);
        return null;
      }
      await ctx.runMutation(internal.bookings._setDailyRoomUrl, {
        bookingId: args.bookingId,
        url: data.url,
      });
    } catch (err) {
      console.error("Daily fetch failed:", err);
    }
    return null;
  },
});
