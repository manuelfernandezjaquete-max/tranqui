import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture only 10% of traces in production to keep costs low
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Replay only on errors (no session recording by default)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  // Do NOT send message content — PII protection
  // Strip breadcrumb data to avoid leaking consultation content
  beforeSend(event) {
    // Remove breadcrumbs entirely to avoid any PII in messages
    return { ...event, breadcrumbs: undefined };
  },

  integrations: [],
});
