import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung für RIOT MAISON — Informationen gemäß DSGVO für Besucherinnen und Besucher aus dem deutschsprachigen Raum.",
};

export default function DatenschutzPage() {
  return (
    <article className="space-y-10 text-[15px] leading-[1.8] text-kuro-midori/85">
      <div>
        <h1 className="font-display text-3xl font-normal tracking-tight text-kuro-midori">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-kuro-midori/65">
          Stand: Mai 2026 — RIOT MAISON (RIOT JAPAN), Angebot für Gäste aus
          Deutschland, Österreich und der Schweiz.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">
          1. Verantwortliche Stelle
        </h2>
        <p>
          Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          <strong>RIOT JAPAN</strong>
          <br />
          Ryoma Fuse (CEO)
          <br />
          Roppongi, Tokyo, Japan
          <br />
          E-Mail:{" "}
          <a
            href="mailto:privacy@riotmaison.example"
            className="text-urushi-red underline-offset-2 hover:underline"
          >
            privacy@riotmaison.example
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">
          2. Hosting &amp; technische Verarbeitung
        </h2>
        <p>
          Diese Website kann über Anbieter wie{" "}
          <strong>Vercel Inc.</strong> (USA) und verbundene Dienste bereitgestellt
          werden. Dabei können Server-Logdaten (z.&nbsp;B. IP-Adresse in
          gekürzter Form, Zeitstempel, User-Agent) entstehen. Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem,
          stabilem Betrieb).
        </p>
        <p className="text-[14px] text-kuro-midori/70">
          Bitte ergänzen Sie vor dem Livegang die konkreten
          Auftragsverarbeitungsverträge (AVV) und ggf. Standardvertragsklauseln
          mit Ihrem Hosting- und Zahlungsanbieter.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">
          3. Buchungen &amp; Zahlungen
        </h2>
        <p>
          Soweit Zahlungen über <strong>Stripe</strong> oder vergleichbare
          Anbieter abgewickelt werden, gelten deren Datenschutzbestimmungen
          ergänzend. API-Schlüssel und Webhook-Geheimnisse werden ausschließlich
          als Umgebungsvariablen auf dem Server geführt, nicht im Quellcode.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">4. Ihre Rechte</h2>
        <p>
          Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung,
          Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
          Widerspruch gegen bestimmte Verarbeitungen. Außerdem besteht ein
          Beschwerderecht bei einer Aufsichtsbehörde.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">5. Kontakt</h2>
        <p>
          Für datenschutzrechtliche Anfragen wenden Sie sich bitte an die oben
          genannte E-Mail-Adresse. Dieses Dokument ist eine strukturelle
          Vorlage — lassen Sie es vor Produktivbetrieb durch qualifizierte
          Beratung prüfen.
        </p>
      </section>
    </article>
  );
}
