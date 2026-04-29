"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/pets", label: "Mascotas" },
  { href: "/history", label: "Historial" },
  { href: "/bookings", label: "Reservas" },
  { href: "/settings", label: "Ajustes" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border-default bg-bg-elevated/80 backdrop-blur">
      <nav aria-label="Navegación principal" className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/pets" aria-label="Tranqui — inicio">
          <Image src="/logo.svg" alt="Tranqui" width={110} height={46} priority />
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
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
  );
}
