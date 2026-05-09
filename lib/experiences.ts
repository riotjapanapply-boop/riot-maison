export type ExperienceCategory =
  | "hotels"
  | "beauty"
  | "wellness"
  | "dining"
  | "culture";

export type ExperienceTag = "Premium" | "Bestseller" | "Editors Pick";

export type ExperienceListing = {
  id: string;
  category: ExperienceCategory;
  name: string;
  /** e.g. Tokyo, Roppongi */
  locationLine: string;
  tag: ExperienceTag;
  image: string;
  imageAlt: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
};

const u = (path: string) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1200&q=82`;

export const EXPERIENCES: ExperienceListing[] = [
  {
    id: "h1",
    category: "hotels",
    name: "Palace Hotel Tokyo",
    locationLine: "Tokyo, Marunouchi",
    tag: "Premium",
    image: u("photo-1631049307264-da0a9b8ac60b"),
    imageAlt: "Suite mit Panoramablick über Tokyo",
    rating: 4.9,
    reviewCount: 1204,
    priceFrom: 890,
  },
  {
    id: "h2",
    category: "hotels",
    name: "HOSHINOYA Kyoto",
    locationLine: "Kyoto, Arashiyama",
    tag: "Bestseller",
    image: u("photo-1493976040374-85c8e12f0c0e"),
    imageAlt: "Traditionelles Haus an einem ruhigen Kanal",
    rating: 4.95,
    reviewCount: 892,
    priceFrom: 1240,
  },
  {
    id: "h3",
    category: "hotels",
    name: "Gora Kadan",
    locationLine: "Hakone, Gora",
    tag: "Premium",
    image: u("photo-1571896349842-33c89424de2d"),
    imageAlt: "Onsen und Zimmer mit Waldblick",
    rating: 4.88,
    reviewCount: 641,
    priceFrom: 980,
  },
  {
    id: "h4",
    category: "hotels",
    name: "Trunk Hotel Cat Street",
    locationLine: "Tokyo, Shibuya",
    tag: "Editors Pick",
    image: u("photo-1618773928121-c32242e63f39"),
    imageAlt: "Design-Suite mit warmem Licht",
    rating: 4.82,
    reviewCount: 1103,
    priceFrom: 720,
  },
  {
    id: "b1",
    category: "beauty",
    name: "Pola The Beauty Ginza",
    locationLine: "Tokyo, Ginza",
    tag: "Premium",
    image: u("photo-1560066984-138dadb4c035"),
    imageAlt: "Ruhiger Behandlungsraum",
    rating: 4.91,
    reviewCount: 756,
    priceFrom: 185,
  },
  {
    id: "b2",
    category: "beauty",
    name: "Shiseido Salon de Beauté",
    locationLine: "Tokyo, Ginza",
    tag: "Bestseller",
    image: u("photo-1519415943484-9fa1873496d4"),
    imageAlt: "Kosmetikbehandlung in eleganter Umgebung",
    rating: 4.87,
    reviewCount: 523,
    priceFrom: 210,
  },
  {
    id: "b3",
    category: "beauty",
    name: "Aman Spa Tokyo",
    locationLine: "Tokyo, Otemachi",
    tag: "Premium",
    image: u("photo-1540555700478-4be289fbecef"),
    imageAlt: "Spa mit Pool und Aussicht",
    rating: 4.93,
    reviewCount: 412,
    priceFrom: 265,
  },
  {
    id: "b4",
    category: "beauty",
    name: "Clé de Peau Suite",
    locationLine: "Kyoto, Kawaramachi",
    tag: "Editors Pick",
    image: u("photo-1515377905703-c4788e51af15"),
    imageAlt: "Gesichtsbehandlung in minimalistischem Raum",
    rating: 4.85,
    reviewCount: 298,
    priceFrom: 195,
  },
  {
    id: "w1",
    category: "wellness",
    name: "Hakone Yuryo",
    locationLine: "Hakone, Kowakudani",
    tag: "Bestseller",
    image: u("photo-1544986581-efac024faf62"),
    imageAlt: "Freiluft-Onsen in bewaldeter Landschaft",
    rating: 4.79,
    reviewCount: 2401,
    priceFrom: 48,
  },
  {
    id: "w2",
    category: "wellness",
    name: "Chiba Seaside Onsen",
    locationLine: "Chiba, Kujukuri",
    tag: "Editors Pick",
    image: u("photo-1506905925346-21bda4d32df4"),
    imageAlt: "Thermalbad nahe der Küste",
    rating: 4.72,
    reviewCount: 887,
    priceFrom: 62,
  },
  {
    id: "w3",
    category: "wellness",
    name: "Aman Kyoto Onsen Pavillon",
    locationLine: "Kyoto, Takagamine",
    tag: "Premium",
    image: u("photo-1600334129128-685c5582fd35"),
    imageAlt: "Steinbecken und Moosgarten",
    rating: 4.94,
    reviewCount: 356,
    priceFrom: 320,
  },
  {
    id: "w4",
    category: "wellness",
    name: "Spa LaQua Tokyo",
    locationLine: "Tokyo, Korakuen",
    tag: "Bestseller",
    image: u("photo-1544161515-4ab6be6ccb84"),
    imageAlt: "Innenpool mit gedämpftem Licht",
    rating: 4.68,
    reviewCount: 4520,
    priceFrom: 38,
  },
  {
    id: "d1",
    category: "dining",
    name: "Sukiyabashi Jiro Roppongi",
    locationLine: "Tokyo, Roppongi",
    tag: "Premium",
    image: u("photo-1579584425555-c3ce17fd4351"),
    imageAlt: "Omakase an der Sushitheke",
    rating: 4.96,
    reviewCount: 1842,
    priceFrom: 420,
  },
  {
    id: "d2",
    category: "dining",
    name: "Kikunoi Honten",
    locationLine: "Kyoto, Maruyama",
    tag: "Bestseller",
    image: u("photo-1559339352-11d035aa65de"),
    imageAlt: "Kaiseki in ruhigem Speiseraum",
    rating: 4.92,
    reviewCount: 967,
    priceFrom: 380,
  },
  {
    id: "d3",
    category: "dining",
    name: "Florilège Aoyama",
    locationLine: "Tokyo, Aoyama",
    tag: "Editors Pick",
    image: u("photo-1414235077428-338989a2e8c0"),
    imageAlt: "Fine Dining mit offener Küche",
    rating: 4.89,
    reviewCount: 1120,
    priceFrom: 290,
  },
  {
    id: "d4",
    category: "dining",
    name: "Sushi Saito",
    locationLine: "Tokyo, Ark Hills",
    tag: "Premium",
    image: u("photo-1611143669185-af224c5e3252"),
    imageAlt: "Edomae-Sushi in intimer Atmosphäre",
    rating: 4.98,
    reviewCount: 634,
    priceFrom: 510,
  },
  {
    id: "c1",
    category: "culture",
    name: "Private Tea at Happo-en",
    locationLine: "Tokyo, Shirokanedai",
    tag: "Premium",
    image: u("photo-1545048705-749a801ffbab"),
    imageAlt: "Teezeremonie in einem Garten",
    rating: 4.84,
    reviewCount: 445,
    priceFrom: 120,
  },
  {
    id: "c2",
    category: "culture",
    name: "Benesse Art Site Naoshima",
    locationLine: "Kagawa, Naoshima",
    tag: "Bestseller",
    image: u("photo-1542640244-7e672d6cef4e"),
    imageAlt: "Moderne Architektur am Meer",
    rating: 4.9,
    reviewCount: 2103,
    priceFrom: 85,
  },
  {
    id: "c3",
    category: "culture",
    name: "Gion Corner Evening",
    locationLine: "Kyoto, Gion",
    tag: "Editors Pick",
    image: u("photo-1524413840807-0c3cb3fa641b"),
    imageAlt: "Traditionelle Bühne in Kyoto",
    rating: 4.76,
    reviewCount: 3201,
    priceFrom: 42,
  },
  {
    id: "c4",
    category: "culture",
    name: "TeamLab Planets",
    locationLine: "Tokyo, Toyosu",
    tag: "Bestseller",
    image: u("photo-1549692520-acc6669e2f0c"),
    imageAlt: "Immersive Lichtinstallation",
    rating: 4.73,
    reviewCount: 8904,
    priceFrom: 32,
  },
];

export const POPULAR_TOKYO_IDS = [
  "h1",
  "d1",
  "w4",
  "c4",
  "b1",
  "h4",
];

export function getExperiencesByCategory(category: ExperienceCategory) {
  return EXPERIENCES.filter((e) => e.category === category);
}

export function getPopularTokyo() {
  return POPULAR_TOKYO_IDS.map((id) => EXPERIENCES.find((e) => e.id === id)).filter(
    (e): e is ExperienceListing => Boolean(e),
  );
}

export const CATEGORY_NAV = [
  { id: "hotels" as const, label: "Hotels", sectionId: "section-hotels" },
  { id: "beauty" as const, label: "Beauty", sectionId: "section-beauty" },
  { id: "wellness" as const, label: "Wellness", sectionId: "section-wellness" },
  { id: "dining" as const, label: "Dining", sectionId: "section-dining" },
  { id: "culture" as const, label: "Culture", sectionId: "section-culture" },
] as const;

export type NavCategoryId = (typeof CATEGORY_NAV)[number]["id"];
