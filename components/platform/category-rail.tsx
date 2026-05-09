"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Heart,
  Landmark,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_NAV } from "@/lib/experiences";
import { usePlatformScroll } from "./platform-scroll-context";

const ICONS: Record<(typeof CATEGORY_NAV)[number]["id"], LucideIcon> = {
  hotels: Building2,
  beauty: Sparkles,
  wellness: Heart,
  dining: UtensilsCrossed,
  culture: Landmark,
};

export function CategoryRail() {
  const { scrollToSection, activeNavId } = usePlatformScroll();

  return (
    <nav
      aria-label="Kategorien"
      className="border-b border-kuro-midori/10 bg-stone-gray/95 py-6 backdrop-blur-sm sm:py-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 lg:px-12">
        <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.32em] text-kuro-midori/45 sm:text-left">
          Kuratierte Welten
        </p>
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:pb-0">
          {CATEGORY_NAV.map((cat, i) => {
            const Icon = ICONS[cat.id];
            const isActive = activeNavId === cat.sectionId;
            return (
              <li
                key={cat.id}
                className="min-w-[42%] shrink-0 snap-center sm:min-w-0"
              >
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 * i,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => scrollToSection(cat.sectionId)}
                  className={`flex w-full min-h-[88px] touch-manipulation flex-col items-center justify-center gap-2 border px-3 py-4 text-center transition-[border-color,transform,background-color] active:scale-[0.98] sm:min-h-[100px] sm:px-4 ${
                    isActive
                      ? "border-brass-gold/70 bg-white/50"
                      : "border-kuro-midori/10 bg-white/25 hover:border-kuro-midori/25 hover:bg-white/40"
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold`}
                >
                  <Icon
                    className="h-5 w-5 text-kuro-midori/70"
                    strokeWidth={1.2}
                    aria-hidden
                  />
                  <span className="text-[12px] font-medium tracking-wide text-kuro-midori">
                    {cat.label}
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
