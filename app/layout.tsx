import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar.server";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://kisskissnapoli.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kiss Kiss Napoli – La Radio di Napoli",
    template: "%s | Kiss Kiss Napoli",
  },
  description:
    "Kiss Kiss Napoli: notizie in tempo reale, programmi radio, sport, calcio Napoli e web radio. La voce di Napoli.",
  keywords: [
    "Kiss Kiss Napoli",
    "radio Napoli",
    "notizie Napoli",
    "calcio Napoli",
    "SSC Napoli",
    "web radio",
    "programmi radio",
    "Only Radio",
  ],
  authors: [{ name: "Kiss Kiss Napoli", url: SITE_URL }],
  creator: "Kiss Kiss Napoli",
  publisher: "Only Radio S.R.L",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Kiss Kiss Napoli",
    title: "Kiss Kiss Napoli – La Radio di Napoli",
    description:
      "Kiss Kiss Napoli: notizie in tempo reale, programmi radio, sport, calcio Napoli e web radio.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiss Kiss Napoli – La Radio di Napoli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiss Kiss Napoli – La Radio di Napoli",
    description:
      "Notizie in tempo reale, programmi radio, sport e web radio. La voce di Napoli.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  name: "Kiss Kiss Napoli",
  url: SITE_URL,
  logo: `${SITE_URL}/navLogo.png`,
  description:
    "Kiss Kiss Napoli è la principale emittente radiofonica di Napoli. Notizie, sport, musica e web radio.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Napoli",
    addressCountry: "IT",
  },
  sameAs: [
    "https://www.facebook.com/KissKissNapoli",
    "https://twitter.com/kisskissnapoli",
    "https://www.instagram.com/kisskissnapoli",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-primary-background">
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
