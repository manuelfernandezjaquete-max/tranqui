/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ai from "../ai.js";
import type * as availability from "../availability.js";
import type * as bookings from "../bookings.js";
import type * as consultations from "../consultations.js";
import type * as dailyRooms from "../dailyRooms.js";
import type * as email from "../email.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_clinicalSkill from "../lib/clinicalSkill.js";
import type * as lib_disclaimerText from "../lib/disclaimerText.js";
import type * as lib_permissions from "../lib/permissions.js";
import type * as lib_prompt from "../lib/prompt.js";
import type * as lib_rateLimit from "../lib/rateLimit.js";
import type * as messages from "../messages.js";
import type * as pets from "../pets.js";
import type * as users from "../users.js";
import type * as vets from "../vets.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ai: typeof ai;
  availability: typeof availability;
  bookings: typeof bookings;
  consultations: typeof consultations;
  dailyRooms: typeof dailyRooms;
  email: typeof email;
  "lib/auth": typeof lib_auth;
  "lib/clinicalSkill": typeof lib_clinicalSkill;
  "lib/disclaimerText": typeof lib_disclaimerText;
  "lib/permissions": typeof lib_permissions;
  "lib/prompt": typeof lib_prompt;
  "lib/rateLimit": typeof lib_rateLimit;
  messages: typeof messages;
  pets: typeof pets;
  users: typeof users;
  vets: typeof vets;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  rateLimiter: import("@convex-dev/rate-limiter/_generated/component.js").ComponentApi<"rateLimiter">;
};
