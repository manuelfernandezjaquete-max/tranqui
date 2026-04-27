import { RateLimiter, MINUTE } from "@convex-dev/rate-limiter";
import { components } from "../_generated/api";

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

// Centralized rate limits used across mutations / actions.
// FR-016 of docs/prd.md.
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Free-trial: 3 consultations per email per ~calendar month.
  // Implemented via fixed-window so the count resets cleanly.
  freeTrial: { kind: "fixed window", rate: 3, period: MONTH_MS },

  // AI message rate per user per minute.
  aiMessages: { kind: "token bucket", rate: 30, period: MINUTE, capacity: 30 },

  // Booking creation per user per day. Wired in Phase 3.
  bookingCreate: {
    kind: "token bucket",
    rate: 5,
    period: 24 * 60 * MINUTE,
    capacity: 5,
  },
});
