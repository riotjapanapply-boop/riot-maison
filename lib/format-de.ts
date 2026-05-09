/**
 * German locale formatting for DE-first market (DD.MM.YYYY, EUR suffix).
 */

export function formatDateDE(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

/** Whole euros, German grouping, € on the right (e.g. 1.200 €). */
export function formatCurrencyEUR(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Platform listing line: Ab 890 € */
export function formatAbEUR(amount: number): string {
  return `Ab ${formatCurrencyEUR(amount)}`;
}

/** Review counts with German grouping (e.g. 1.204). */
export function formatCountDE(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}

/** Parse YYYY-MM-DD from native date input into Date (local midnight). */
export function parseISODateInput(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
