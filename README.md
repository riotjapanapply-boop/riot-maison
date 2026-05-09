# RIOT MAISON

Boutique-Plattform für kuratierte Japan-Erlebnisse (Next.js App Router, Tailwind v4, Framer Motion). Zielgruppe: deutschsprachiger High-End-Markt (DACH).

## Voraussetzungen

- Node.js 20+
- npm (oder pnpm/yarn)

## Lokale Entwicklung

```bash
cp .env.example .env.local
# .env.local anpassen (mindestens NEXT_PUBLIC_SITE_URL)

npm install
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000).

## Umgebungsvariablen

Siehe [`.env.example`](./.env.example). **Niemals** echte API-Schlüssel committen — nur in Vercel „Environment Variables“ oder in `.env.local` (gitignored).

| Variable | Beschreibung |
|----------|----------------|
| `NEXT_PUBLIC_SITE_URL` | Kanonische URL (ohne trailing slash), z. B. `https://ihre-domain.vercel.app` |
| `STRIPE_SECRET_KEY` | Stripe Secret (nur Server) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable (Client) |
| `DATABASE_URL` | Postgres o. ä. (Server) |

Zugriff im Code über [`lib/env.ts`](./lib/env.ts) (`process.env` dort bündeln).

## Qualitätssicherung

```bash
npm run lint
npm run build
```

## Deploy auf Vercel

1. Repository auf GitHub anlegen und pushen.
2. In der URL unten **`YOUR_GITHUB_USER` / `riot-maison`** durch Ihr echtes Repo ersetzen.
3. Nach dem Import in Vercel: `NEXT_PUBLIC_SITE_URL` auf die Production-URL setzen.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR_GITHUB_USER%2Friot-maison&env=NEXT_PUBLIC_SITE_URL,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,DATABASE_URL&envDescription=Siehe%20.env.example%20im%20Repository.)

## Rechtliches (DACH)

- [Impressum](/legal/impressum)
- [Datenschutz](/legal/datenschutz)

Vor Go-Live: Impressum/Datenschutz und Kontakt-E-Mails durch Ihre Rechtsberatung finalisieren.

## Lizenz

Proprietär — RIOT JAPAN / RIOT MAISON.
