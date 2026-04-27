import { ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";

export async function requireUser(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"users">> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError({
      code: "UNAUTHENTICATED",
      message: "Auth required",
    });
  }
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();
  if (!user) {
    throw new ConvexError({
      code: "NOT_BOOTSTRAPPED",
      message: "Run users.bootstrap before calling this function",
    });
  }
  return user;
}

export async function requireHousehold(ctx: QueryCtx | MutationCtx) {
  const user = await requireUser(ctx);
  if (!user.householdId) {
    throw new ConvexError({
      code: "NO_HOUSEHOLD",
      message: "User has no household",
    });
  }
  return { user, householdId: user.householdId };
}
