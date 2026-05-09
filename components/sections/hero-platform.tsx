"use client";

import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import Image from "next/image";
import { PlatformSearchBar } from "@/components/platform/platform-search-bar";
import { useBookingModal } from "@/components/booking/booking-context";
import { IMAGES } from "@/lib/media";

export function HeroPlatform() {
  const { openBooking } = useBookingModal();

  return (
    <section className="bg-kuro-midori text-stone-gray">
      <div className="grid min-h-[100dvh] md:min-h-[min(100dvh,58rem)] md:grid-cols-2">
        <motion.div
          className="relative min-h-[38vh] md:min-h-full md:order-2"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={IMAGES.hero}
            alt="Japanische Ästhetik — zurückhaltende Eleganz"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-kuro-midori via-kuro-midori/35 to-transparent md:bg-gradient-to-l md:from-kuro-midori md:via-kuro-midori/25 md:to-transparent"
            aria-hidden
          />
        </motion.div>

        <div className="flex flex-col justify-end px-6 pb-12 pt-10 sm:px-12 sm:pb-16 md:order-1 md:justify-center md:px-14 md:pb-20 md:pt-16 lg:px-20 landscape:md:py-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.38em] text-stone-gray/55 md:mb-12">
              Authentisches Japan · für Europa kuratiert
            </p>
            <h1 className="max-w-4xl text-[clamp(2.5rem,5.8vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.02em]">
              RIOT MAISON
            </h1>
            <p className="mt-8 max-w-xl text-[16px] leading-[1.82] text-stone-gray/75 md:mt-10">
              Japans feinste Adressen — von uns vor Ort erlebt, für Sie
              zusammengestellt. Kein anonymes Portal: eine boutique
              Plattform, die Qualität vor Quantität stellt.
            </p>
            <p className="mt-6 max-w-lg text-[14px] leading-[1.75] text-stone-gray/55 italic">
              Von uns kuratiert: die Essenz japanischer Ästhetik.
            </p>

            <PlatformSearchBar />

            <div className="mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:items-center sm:gap-10">
              <button
                type="button"
                onClick={openBooking}
                className="min-h-[48px] w-fit touch-manipulation bg-urushi-on-dark px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-stone-gray transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-urushi-on-dark sm:px-12 sm:py-5"
              >
                Ihr Erlebnis sichern
              </button>
              <div className="flex items-center gap-5">
                <Diamond
                  className="h-3 w-3 shrink-0 text-brass-gold"
                  strokeWidth={1.15}
                  aria-hidden
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-stone-gray/45">
                  Boutique · nur Japan
                </span>
              </div>
            </div>
          </motion.header>
        </div>
      </div>
    </section>
  );
}
