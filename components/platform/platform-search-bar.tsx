"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { usePlatformScroll } from "./platform-scroll-context";

const JAPAN_AREAS = [
  { value: "tokyo", label: "Tokyo" },
  { value: "kyoto", label: "Kyoto" },
  { value: "chiba", label: "Chiba" },
  { value: "hakone", label: "Hakone" },
] as const;

export function PlatformSearchBar() {
  const { scrollToSection } = usePlatformScroll();
  const [dateIso, setDateIso] = useState("");
  const [area, setArea] = useState<(typeof JAPAN_AREAS)[number]["value"]>(
    "tokyo",
  );
  const [guests, setGuests] = useState(2);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    scrollToSection("section-popular");
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 w-full max-w-4xl border border-white/15 bg-kuro-midori/75 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md sm:mt-16 sm:px-6 sm:py-5 lg:mt-20"
      aria-label="Japan erkunden — nur ausgewählte Regionen"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x lg:divide-white/10">
        <label className="flex min-h-[52px] flex-1 cursor-pointer items-center gap-3 px-2 touch-manipulation sm:px-3">
          <CalendarDays
            className="h-5 w-5 shrink-0 text-brass-gold/90"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-gray/50">
              Wunschdatum
            </span>
            <input
              type="date"
              value={dateIso}
              onChange={(e) => setDateIso(e.target.value)}
              className="mt-1 w-full min-w-0 border-0 bg-transparent text-[15px] text-stone-gray outline-none focus:ring-0"
            />
          </span>
        </label>

        <label className="flex min-h-[52px] flex-1 cursor-pointer items-center gap-3 px-2 touch-manipulation sm:px-3 lg:pl-6">
          <MapPin
            className="h-5 w-5 shrink-0 text-brass-gold/90"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-gray/50">
              Region in Japan
            </span>
            <select
              value={area}
              onChange={(e) =>
                setArea(e.target.value as (typeof JAPAN_AREAS)[number]["value"])
              }
              className="mt-1 w-full cursor-pointer border-0 bg-transparent text-[15px] text-stone-gray outline-none focus:ring-0"
            >
              {JAPAN_AREAS.map((a) => (
                <option key={a.value} value={a.value} className="text-kuro-midori">
                  {a.label}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex min-h-[52px] flex-1 cursor-pointer items-center gap-3 px-2 touch-manipulation sm:px-3 lg:pl-6">
          <Users
            className="h-5 w-5 shrink-0 text-brass-gold/90"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-gray/50">
              Gäste
            </span>
            <select
              value={guests}
              onChange={(e) =>
                setGuests(Number.parseInt(e.target.value, 10))
              }
              className="mt-1 w-full cursor-pointer border-0 bg-transparent text-[15px] text-stone-gray outline-none focus:ring-0"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="text-kuro-midori">
                  {n}
                </option>
              ))}
            </select>
          </span>
        </label>

        <div className="flex items-center lg:w-auto lg:shrink-0 lg:pl-4">
          <button
            type="submit"
            className="min-h-[52px] w-full touch-manipulation bg-brass-gold/95 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-kuro-midori transition-[filter,transform] hover:brightness-105 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold lg:w-auto lg:px-10"
          >
            Entdecken Sie Japan
          </button>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-gray/45 lg:text-left">
        Nur ausgewählte Regionen — authentisch Japan, für Gäste aus Europa
        kuratiert.
      </p>
    </motion.form>
  );
}
