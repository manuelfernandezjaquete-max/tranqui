"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UserBootstrap } from "@/components/shared/UserBootstrap";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Mi calendario" },
  { href: "/dashboard?tab=bookings", label: "Próximas consultas" },
];

export default function VetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const me = useQuery(api.users.me);

  if (me === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sage-500 border-t-transparent" />
      </div>
    );
  }
  if (me === null || (me.role !== "vet" && me.role !== "admin")) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-sage-700">
          Acceso solo para veterinarios
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Si crees que esto es un error, contacta con Tranqui.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <UserBootstrap />
      <header className="sticky top-0 z-10 border-b border-border-default bg-bg-elevated/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link
            href="/dashboard"
            className="font-display text-xl font-semibold tracking-tight text-sage-700"
          >
            Tranqui · Vet
          </Link>
          <ul className="hidden items-center gap-1 sm:flex">
            {NAV.map((link) => {
              const isActive = pathname.startsWith(link.href.split("?")[0]);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sage-200 text-sage-700"
                        : "text-text-secondary hover:bg-bg-muted hover:text-text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <UserButton />
        </nav>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">
        {children}
      </div>
    </div>
  );
}
