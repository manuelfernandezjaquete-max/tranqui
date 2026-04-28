import { ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import { requireUser } from "./auth";

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
): Promise<Doc<"users">> {
  const user = await requireUser(ctx);
  if (user.role !== "admin") {
    throw new ConvexError({
      code: "FORBIDDEN",
      message: "Solo admins pueden ejecutar esta acción",
    });
  }
  return user;
}

export async function requireVet(
  ctx: QueryCtx | MutationCtx,
): Promise<{ user: Doc<"users">; vet: Doc<"veterinarians"> }> {
  const user = await requireUser(ctx);
  if (user.role !== "vet" && user.role !== "admin") {
    throw new ConvexError({
      code: "FORBIDDEN",
      message: "Solo veterinarios pueden ejecutar esta acción",
    });
  }
  const vet = await ctx.db
    .query("veterinarians")
    .withIndex("by_user", (q) => q.eq("userId", user._id))
    .unique();
  if (!vet) {
    throw new ConvexError({
      code: "VET_PROFILE_MISSING",
      message: "No tienes un perfil de veterinario",
    });
  }
  return { user, vet };
}
