"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function UserBootstrap() {
  const { isSignedIn, isLoaded } = useUser();
  const bootstrap = useMutation(api.users.bootstrap);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasRun.current) return;
    hasRun.current = true;
    bootstrap().catch((err) => {
      hasRun.current = false;
      console.error("users.bootstrap failed:", err);
    });
  }, [isLoaded, isSignedIn, bootstrap]);

  return null;
}
