import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript } from "@mantine/core";
import LibProviders from "./_libProviders";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strata AI | Your Expert Guide to Strata Management in Australia",
  description:
    "Strata AI, powered by Stratapages, is your ultimate guide for all strata management queries in Australia. Connect with owners and corporations, get expert answers, and streamline your strata experience with our cutting-edge AI technology.",
  keywords:
    "Strata AI, Stratapages, Strata management Australia, check traders, home reno contractor, find a tradesman, my job quote, find a trade, local tradies, my builder app, hi pagers, tradesmen near me, local tradesmen, find a builder, my builder login, find a tradesperson, book a builder, my quote job, local handyman near me, builders near me, hire a builder, my job quote reviews, home improvements near me, trust the trader, trust a tradesman, building companies near me, bathroom renovators near me, trades man, cheap handyman near me, handyman plumber, renovation contractors, handyman needed, renovation quote, local trades, plumber quote, reputable builders near me, home renovation builders near me, shower renovations near me, handy person near me, find me a tradesman, tradespeople near me, local tradespeople, homeowners looking for contractors, reno quotes, builder crack, handyman needed near me, apps for builders, tradesman quotes, odd job man, myjob quote, handyman wanted, get tradesmen quotes, diy handyman near me, home improvement builders near me, local bathroom renovators, app for tradesmen, building renovations, building firms near me, electrician plumber, diy person near me, finding a handyman near me, best apps for builders, check a trade plumbers, in need of a plumber, handyman in this area, builder company near me, i need a handyman in my area, builder around me, plumber by trade, builder local, home improvement pages sydney, plumbing in australia, find me a trader, find my trader, hipage, marketplace handyman, reno companies near me, plumbing and electrician, renovations australia, being a plumber, home renovation job, home renovations australia, handyman australia, home renovation handyman, plumber and carpenter, house renovation australia, hirepages, in need of plumber, house improvements near me, good builder, l list, your pro, home improvements services, trade jobs online, installation garage",
  applicationName: "Strata AI",
  authors: {
    name: "Stratapages",
    url: "https://stratapages.com.au",
  },
  openGraph: {
    title: "Strata AI | Your Expert Guide to Strata Management in Australia",
    description:
      "Strata AI, powered by Stratapages, is your ultimate guide for all strata management queries in Australia. Connect with owners and corporations, get expert answers, and streamline your strata experience with our cutting-edge AI technology.",
    images: "/strata-ai.png",
    url: "https://chat.stratapages.com.au",
  },
  twitter: {
    title: "Strata AI | Your Expert Guide to Strata Management in Australia",
    description:
      "Strata AI, powered by Stratapages, is your ultimate guide for all strata management queries in Australia. Connect with owners and corporations, get expert answers, and streamline your strata experience with our cutting-edge AI technology.",
    images: "/strata-ai.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="NbsiKoeSi7CCeNaYmPf-VyBBykenZEWgnHOMCZv0UnA"
        />
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <LibProviders>{children}</LibProviders>
      </body>
      <GoogleAnalytics gaId="G-M6PH82VQES" />
    </html>
  );
}
