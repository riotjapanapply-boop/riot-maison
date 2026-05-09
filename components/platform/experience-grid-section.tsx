"use client";

import { motion } from "framer-motion";
import type { ExperienceListing } from "@/lib/experiences";
import { ExperienceCard } from "./experience-card";

type Props = {
  sectionId: string;
  title: string;
  curatorNote: string;
  listings: ExperienceListing[];
};

export function ExperienceGridSection({
  sectionId,
  title,
  curatorNote,
  listings,
}: Props) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-24 border-t border-kuro-midori/[0.08] bg-stone-gray px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      aria-labelledby={`heading-${sectionId}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <h2
            id={`heading-${sectionId}`}
            className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-kuro-midori"
          >
            {title}
          </h2>
          <p className="mt-6 text-[15px] leading-[1.85] text-kuro-midori/72">
            {curatorNote}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10">
          {listings.map((item, i) => (
            <ExperienceCard key={item.id} listing={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
