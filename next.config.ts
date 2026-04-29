import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Optimise images
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Strict mode for React — catches extra issues in dev
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Tree-shake large icon/clerk bundles
  experimental: {
    optimizePackageImports: ["lucide-react", "@clerk/nextjs"],
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry organisation + project configured via SENTRY_ORG / SENTRY_PROJECT env vars
  silent: true,
  // Do not send telemetry to Sentry
  telemetry: false,
});
