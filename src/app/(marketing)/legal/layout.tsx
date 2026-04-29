import Link from "next/link";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Wordmark } from "@/components/marketing/Wordmark";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-base">
      <MarketingNav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <article className="prose-legal">{children}</article>
      </main>
      <footer className="border-t border-border-default px-6 py-10 sm:px-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-text-secondary/70">
          <Wordmark size="sm" />
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/terms" className="hover:text-text-primary">
              Aviso legal
            </Link>
            <Link href="/legal/privacy" className="hover:text-text-primary">
              Privacidad
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-text-primary">
              Disclaimer médico
            </Link>
            <a href="mailto:hola@tranqui.app" className="hover:text-text-primary">
              hola@tranqui.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
