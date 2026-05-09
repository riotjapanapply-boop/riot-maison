export type StayPlan = {
  id: string;
  name: string;
  subtitle: string;
  basePerNight: number;
};

export const STAY_PLANS: StayPlan[] = [
  {
    id: "kisho",
    name: "Kishō — Tokyo Residence",
    subtitle: "Zimmer mit Blick, japanisches Frühstück, diskreter Service",
    basePerNight: 890,
  },
  {
    id: "maison",
    name: "Maison Nihon Suite",
    subtitle: "Großzügiger Rückzug, persönliche Concierge-Linie",
    basePerNight: 1450,
  },
  {
    id: "onsen",
    name: "Onsen & Kur Privilège",
    subtitle: "Private Thermalzeit, vor Ort von uns verifiziert",
    basePerNight: 2100,
  },
];

export function getPlanById(id: string): StayPlan | undefined {
  return STAY_PLANS.find((p) => p.id === id);
}

/** Room nights + moderate supplement ab dem dritten Gast (Demo-Logik). */
export function computeStayTotalEUR(
  plan: StayPlan,
  nights: number,
  guests: number,
): number {
  const room = plan.basePerNight * nights;
  const extraGuest = Math.max(0, guests - 2) * 95 * nights;
  return Math.round(room + extraGuest);
}

export function generateReservationRef(): string {
  const y = new Date().getFullYear();
  const part = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "0");
  return `RM-${y}-${part()}${part()}`;
}
