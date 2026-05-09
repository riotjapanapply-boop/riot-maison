"use client";

import { motion } from "framer-motion";
import { getPopularTokyo } from "@/lib/experiences";
import { ExperienceCard } from "./experience-card";

export function MostPopularTokyo() {
  const items = getPopularTokyo();

  return (
    <section
      id="section-popular"
      className="scroll-mt-24 border-t border-kuro-midori/[0.08] bg-stone-gray px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      aria-labelledby="heading-popular-tokyo"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-urushi-red/90">
            Most Popular in Tokyo
          </p>
          <h2
            id="heading-popular-tokyo"
            className="mt-5 font-display text-[clamp(1.85rem,3.6vw,2.65rem)] font-normal leading-tight tracking-tight text-kuro-midori"
          >
            Das gefragteste in Tokio — und darüber hinaus
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-kuro-midori/72">
            Von Ryo vor Ort geprüft: Orte, die nicht nur fotogen sind, sondern
            Haltung zeigen. Keine Massenabfertigung — nur Erlebnisse, die wir
            persönlich empfehlen würden.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:gap-10">
          {items.map((item, i) => (
            <ExperienceCard key={item.id} listing={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
