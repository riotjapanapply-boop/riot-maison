import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-stone-gray text-kuro-midori">
      <header className="border-b border-kuro-midori/10 bg-kuro-midori px-6 py-6 text-stone-gray sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-xl tracking-tight">RIOT MAISON</p>
          <Link
            href="/"
            className="text-[13px] text-stone-gray/75 underline-offset-4 transition-colors hover:text-stone-gray hover:underline"
          >
            Zur Startseite
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        {children}
      </div>
    </div>
  );
}
