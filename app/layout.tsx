import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getMetadataBase } from "@/lib/env";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const siteTitle =
  "RIOT MAISON | Japan's Finest Wellness & Lifestyle";

const siteDescription =
  "RIOT MAISON ist die boutique Reservierungsplattform für authentisches Japan: handverlesene Hotels, Onsen, Beauty, Kulinarik und Kultur — ausschließlich in Japan kuratiert, mit der Klarheit und Diskretion, die anspruchsvolle Gäste aus Deutschland, Österreich und der Schweiz erwarten. Kein anonymes Massenportal, sondern ein digitales Salon-Erlebnis für Ihre nächste Japan-Reise.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteTitle,
    template: "%s | RIOT MAISON",
  },
  description: siteDescription,
  keywords: [
    "Japan",
    "Wellness",
    "Luxusreisen",
    "Tokyo",
    "Kyoto",
    "Onsen",
    "Kuratiert",
    "Deutschland",
    "DACH",
    "RIOT MAISON",
  ],
  authors: [{ name: "RIOT JAPAN", url: getMetadataBase().origin }],
  creator: "RIOT JAPAN",
  publisher: "RIOT JAPAN",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "RIOT MAISON",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/favicon.ico" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-stone-gray focus:px-5 focus:py-3 focus:text-[13px] focus:text-kuro-midori focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-gold"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
