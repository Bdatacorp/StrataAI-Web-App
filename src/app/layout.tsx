import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript } from "@mantine/core";
import LibProviders from "./_libProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strata Chat AI",
  description: "Desined & Developed by I S Weerasingha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link
          rel="shortcut icon"
          href="/img/Strata-Logo.png"
          type="image/png"
        />
      </head>
      <body className={inter.className}>
        <LibProviders>{children}</LibProviders>
      </body>
    </html>
  );
}
