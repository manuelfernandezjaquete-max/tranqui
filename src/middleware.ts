import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Route groups like (app) and (vet) do NOT appear in URLs — match against
// the actual URL paths that the (app)/ and (vet)/ folders generate.
const isProtectedRoute = createRouteMatcher([
  "/pets(.*)",
  "/history(.*)",
  "/bookings(.*)",
  "/settings(.*)",
  "/consult(.*)",
  "/dashboard(.*)",
  "/consultation(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
