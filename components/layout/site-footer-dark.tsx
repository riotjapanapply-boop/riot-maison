"use client";

import Link from "next/link";
import { useBookingModal } from "@/components/booking/booking-context";

export function SiteFooterDark() {
  const { openBooking } = useBookingModal();

  return (
    <footer className="bg-kuro-midori text-stone-gray">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-10 py-section-lg sm:px-20 lg:flex-row lg:justify-between lg:gap-24 lg:px-32 lg:py-section-xl">
        <div>
          <p className="font-display text-2xl font-normal tracking-tight">
            RIOT MAISON
          </p>
          <p className="mt-8 max-w-sm text-[14px] leading-[1.8] text-stone-gray/58">
            Ihre digitale Adresse für Japans herausragendste Erlebnisse —
            kuratiert in Tokio, präsentiert mit europäischer Klarheit. Nur
            Japan. Nur, was wir selbst besucht haben.
          </p>
        </div>
        <nav
          aria-label="Fußzeile"
          className="flex flex-col gap-10 sm:flex-row sm:gap-20 lg:gap-28"
        >
          <div className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-gray/45">
              Erlebnis
            </p>
            <ul className="space-y-4 text-[14px] text-stone-gray/72">
              <li>
                <button
                  type="button"
                  onClick={openBooking}
                  className="min-h-[44px] text-left touch-manipulation py-1 transition-[colors,transform] hover:text-stone-gray active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Ihr Erlebnis sichern
                </button>
              </li>
              <li>
                <span className="text-stone-gray/45">Verfügbarkeit</span>
                <span className="ml-2 text-[12px] text-stone-gray/35">
                  nach Japan-Saison
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-stone-gray/45">
              Rechtliches
            </p>
            <ul className="space-y-4 text-[14px] text-stone-gray/55">
              <li>
                <Link
                  href="/legal/impressum"
                  className="transition-colors hover:text-stone-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/datenschutz"
                  className="transition-colors hover:text-stone-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-10 py-12 text-[12px] text-stone-gray/45 sm:flex-row sm:items-center sm:justify-between sm:px-20 lg:px-32">
          <p>© {new Date().getFullYear()} RIOT MAISON · Japan curation</p>
          <p className="uppercase tracking-[0.2em]">Preise in EUR · de-DE</p>
        </div>
      </div>
    </footer>
  );
}
