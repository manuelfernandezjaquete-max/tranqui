"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import { Wordmark } from "./Wordmark";

export function MarketingNav() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-10 border-b border-border-default bg-bg-base/75 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-14">
        <Wordmark />
        <div className="flex items-center gap-4 text-sm text-text-secondary sm:gap-7">
          <Link
            href="/faq"
            className="hidden hover:text-text-primary sm:inline"
          >
            Cómo funciona
          </Link>
          <Link
            href="/pricing"
            className="hidden hover:text-text-primary sm:inline"
          >
            Precio
          </Link>
          {isLoaded && isSignedIn ? (
            <Link href="/consult">
              <Button size="sm">Ir a la app</Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
              <Link href="/consult/new">
                <Button size="sm">Empezar gratis</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
