"use client";

import { BookingModal } from "@/components/booking/booking-modal";
import { BookingModalProvider } from "@/components/booking/booking-context";
import { SiteFooterDark } from "@/components/layout/site-footer-dark";
import { CategoryRail } from "@/components/platform/category-rail";
import { ExperienceGridSection } from "@/components/platform/experience-grid-section";
import { MostPopularTokyo } from "@/components/platform/most-popular-tokyo";
import { PlatformScrollProvider } from "@/components/platform/platform-scroll-context";
import { HeroPlatform } from "@/components/sections/hero-platform";
import { VipDark } from "@/components/sections/vip-dark";
import { getExperiencesByCategory } from "@/lib/experiences";

const GRID_COPY = {
  hotels: {
    title: "Hotels & Ryokan — Rückzug mit Haltung",
    curatorNote:
      "Wir haben jedes Haus betreten, bevor es hier erscheint. Für Sie nur Zimmer, die Stille ernst meinen — von Tokyo bis Hakone, ausschließlich in Japan.",
  },
  beauty: {
    title: "Beauty — Präzision, keine Show",
    curatorNote:
      "Salons und Spas, denen Diskretion wichtiger ist als Instagram. Von Ryo in Japan ausgewählt, damit Sie sich in guten Händen wissen.",
  },
  wellness: {
    title: "Wellness & Onsen — Wasser, Holz, Zeit",
    curatorNote:
      "Thermen und Bäder, die nicht wie Freizeitparks wirken. Wir buchen, was wir selbst gerne einem geschätzten Gast empfehlen würden.",
  },
  dining: {
    title: "Dining — Handwerk vor Spektakel",
    curatorNote:
      "Kaiseki, Omakase, klare Küche: Adressen, die Respekt vor dem Produkt zeigen. Alles in Japan — keine Kompromisse.",
  },
  culture: {
    title: "Culture — Japan, das man nicht überfliegt",
    curatorNote:
      "Kunst, Tee, Nacht — kuratiert für Gäste, die Tiefe suchen. Nur Orte, die wir persönlich erlebt haben.",
  },
} as const;

export function HomeExperience() {
  return (
    <BookingModalProvider>
      <PlatformScrollProvider>
        <main id="main-content">
          <HeroPlatform />
          <CategoryRail />
          <MostPopularTokyo />
          <ExperienceGridSection
            sectionId="section-hotels"
            title={GRID_COPY.hotels.title}
            curatorNote={GRID_COPY.hotels.curatorNote}
            listings={getExperiencesByCategory("hotels")}
          />
          <ExperienceGridSection
            sectionId="section-beauty"
            title={GRID_COPY.beauty.title}
            curatorNote={GRID_COPY.beauty.curatorNote}
            listings={getExperiencesByCategory("beauty")}
          />
          <ExperienceGridSection
            sectionId="section-wellness"
            title={GRID_COPY.wellness.title}
            curatorNote={GRID_COPY.wellness.curatorNote}
            listings={getExperiencesByCategory("wellness")}
          />
          <ExperienceGridSection
            sectionId="section-dining"
            title={GRID_COPY.dining.title}
            curatorNote={GRID_COPY.dining.curatorNote}
            listings={getExperiencesByCategory("dining")}
          />
          <ExperienceGridSection
            sectionId="section-culture"
            title={GRID_COPY.culture.title}
            curatorNote={GRID_COPY.culture.curatorNote}
            listings={getExperiencesByCategory("culture")}
          />
          <VipDark />
          <SiteFooterDark />
        </main>
      </PlatformScrollProvider>
      <BookingModal />
    </BookingModalProvider>
  );
}
