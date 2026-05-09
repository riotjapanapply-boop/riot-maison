"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import type { ExperienceListing, ExperienceTag } from "@/lib/experiences";
import { formatAbEUR, formatCountDE } from "@/lib/format-de";
import { useBookingModal } from "@/components/booking/booking-context";

function tagDe(tag: ExperienceTag): string {
  if (tag === "Editors Pick") return "Unsere Auswahl";
  return tag;
}

type Props = {
  listing: ExperienceListing;
  index?: number;
};

export function ExperienceCard({ listing, index = 0 }: Props) {
  const { openBooking } = useBookingModal();

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden border border-kuro-midori/10 bg-white/35 shadow-[0_12px_40px_rgba(27,36,30,0.06)] transition-[box-shadow,transform] hover:shadow-[0_20px_50px_rgba(27,36,30,0.1)]"
    >
      <button
        type="button"
        onClick={openBooking}
        className="flex flex-1 flex-col text-left touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-urushi-red"
        aria-label={`${listing.name} — ${formatAbEUR(listing.priceFrom)} sichern`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 bg-urushi-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-gray">
            {tagDe(listing.tag)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-normal leading-snug tracking-tight text-kuro-midori">
            {listing.name}
          </h3>
          <p className="mt-1 text-[13px] text-kuro-midori/55">
            {listing.locationLine}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-kuro-midori/75">
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Star
                className="h-3.5 w-3.5 fill-brass-gold text-brass-gold"
                aria-hidden
              />
              {listing.rating.toLocaleString("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-kuro-midori/35" aria-hidden>
              ·
            </span>
            <span className="tabular-nums text-kuro-midori/55">
              {formatCountDE(listing.reviewCount)} Bewertungen
            </span>
          </div>
          <div className="mt-auto flex items-end justify-end pt-6">
            <span className="text-[14px] font-medium tabular-nums text-kuro-midori">
              {formatAbEUR(listing.priceFrom)}
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
