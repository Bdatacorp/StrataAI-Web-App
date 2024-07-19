import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "./_theme";
import ReduxProvider from "@/lib/provider/reduxProvider";

import "./index.css";

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
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
