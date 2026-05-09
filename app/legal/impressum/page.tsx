import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Angaben gemäß § 5 TMG — RIOT JAPAN / RIOT MAISON, vertreten durch Ryoma Fuse.",
};

export default function ImpressumPage() {
  return (
    <article className="space-y-10 text-[15px] leading-[1.8] text-kuro-midori/85">
      <div>
        <h1 className="font-display text-3xl font-normal tracking-tight text-kuro-midori">
          Impressum
        </h1>
        <p className="mt-4 text-kuro-midori/65">
          Angaben gemäß § 5 TMG (Telemediengesetz) und Anbieterkennzeichnung.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">Diensteanbieter</h2>
        <p>
          <strong className="text-kuro-midori">RIOT JAPAN</strong>
          <br />
          vertreten durch den Geschäftsführer:{" "}
          <strong>Ryoma Fuse</strong> (CEO)
          <br />
          Roppongi, Tokyo
          <br />
          Japan
        </p>
        <p className="text-[14px] text-kuro-midori/70">
          Vollständige postalische Anschrift und Registerangaben können auf
          Anfrage mitgeteilt werden. Diese Darstellung dient der
          Transparenzpflicht gegenüber Nutzerinnen und Nutzern im
          deutschsprachigen Raum (DACH).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a
            href="mailto:legal@riotmaison.example"
            className="text-urushi-red underline-offset-2 hover:underline"
          >
            legal@riotmaison.example
          </a>
        </p>
        <p className="text-[13px] text-kuro-midori/60">
          Bitte ersetzen Sie die Kontaktadresse vor dem Livegang durch Ihre
          produktive Domain.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">
          Verantwortlich für den Inhalt
        </h2>
        <p>
          Ryoma Fuse
          <br />
          RIOT JAPAN — RIOT MAISON
          <br />
          Roppongi, Tokyo, Japan
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-kuro-midori">
          Streitbeilegung / EU-Plattform
        </h2>
        <p className="text-[14px] text-kuro-midori/75">
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-urushi-red underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht verpflichtet und grundsätzlich nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen — soweit gesetzlich zulässig.
        </p>
      </section>
    </article>
  );
}
