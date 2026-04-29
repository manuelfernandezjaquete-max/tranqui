import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tranqui.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/faq", "/legal/"],
        disallow: [
          "/pets/",
          "/history/",
          "/bookings/",
          "/settings/",
          "/consult/",
          "/dashboard/",
          "/consultation/",
          "/sign-in/",
          "/sign-up/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
