import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Route groups like (app) and (vet) do NOT appear in URLs — match against
// the actual URL paths that the (app)/ and (vet)/ folders generate.
//
// /consult (exact) is protected (authed entry to start a new consultation).
// /consult/new and /consult/[id] are public to support the free-trial flow
// (FR-001). Their auth is enforced inside Convex via accessToken.
const isProtectedRoute = createRouteMatcher([
  "/pets(.*)",
  "/history(.*)",
  "/bookings(.*)",
  "/settings(.*)",
  "/dashboard(.*)",
  "/consultation(.*)",
  "/consult",
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
