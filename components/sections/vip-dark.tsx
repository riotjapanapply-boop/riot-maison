"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "@/components/booking/booking-context";

export function VipDark() {
  const { openBooking } = useBookingModal();

  return (
    <section className="bg-kuro-midori text-stone-gray">
      <div className="mx-auto max-w-6xl px-10 py-section-lg sm:px-20 lg:px-32 lg:py-section-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="border border-white/10 px-10 py-16 sm:px-16 sm:py-20 lg:px-20 lg:py-24"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-brass-gold/90">
            Maison Circle
          </p>
          <h2 className="mt-12 max-w-2xl text-[clamp(1.85rem,3.2vw,2.5rem)] font-normal leading-[1.15] tracking-tight">
            Wenn Sie Japan ohne Umwege erleben möchten
          </h2>
          <p className="mt-8 max-w-2xl text-[15px] leading-[1.85] text-stone-gray/70">
            Ein kleiner Kreis für Gäste, die Wert auf persönliche Auswahl legen.
            Wir begleiten Sie mit der gleichen Sorgfalt wie bei unseren
            öffentlichen Listings — nur mit noch mehr Spielraum für Wünsche.
          </p>
          <p className="mt-6 max-w-xl text-[14px] italic leading-relaxed text-stone-gray/50">
            Von Ryo: „Was hier steht, kenne ich aus erster Hand.“
          </p>
          <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12 lg:mt-20">
            <button
              type="button"
              onClick={openBooking}
              className="min-h-[48px] w-fit touch-manipulation border border-urushi-on-dark/80 bg-transparent px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-urushi-on-dark transition-[colors,transform] hover:bg-urushi-on-dark/10 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-urushi-on-dark"
            >
              Persönlich anfragen
            </button>
            <p className="max-w-sm text-[13px] leading-relaxed text-stone-gray/50">
              In der Demo öffnet sich derselbe sichere Ablauf — nur Ihre
              Erwartung ist exklusiver formuliert.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
