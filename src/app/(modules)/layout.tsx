import Header from "@/components/genenral/header/header";
import MobileNavbar from "@/components/genenral/navbar/mobileNavbar";
import Navbar from "@/components/genenral/navbar/navbar";
import NavBarLinks from "@/components/genenral/navbar/navbarLinks";
import ModuleLayoutElement from "@/components/layouts/moduleLayout";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleLayoutElement
      mobileNavbar={<MobileNavbar />}
      header={<Header />}
      navbar={<Navbar />}
    >
      {children}
    </ModuleLayoutElement>
  );
}
