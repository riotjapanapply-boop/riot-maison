/**
 * Central access to public configuration. Secrets stay server-only (no NEXT_PUBLIC_).
 */

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/** Base URL for metadata, OG, and server-side absolute URLs. */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.length > 0) {
    return normalizeSiteUrl(explicit);
  }
  const vercel = process.env.VERCEL_URL;
  if (vercel && vercel.length > 0) {
    return normalizeSiteUrl(`https://${vercel}`);
  }
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

/** Server-only Stripe secret; use only in Route Handlers / Server Actions. */
export function getStripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY?.trim() || undefined;
}

export function getStripeWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim() || undefined;
}

/** Client-safe publishable key. */
export function getStripePublishableKey(): string | undefined {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || undefined;
}

/** Database connection string (server-only). */
export function getDatabaseUrl(): string | undefined {
  return process.env.DATABASE_URL?.trim() || undefined;
}
