import Header from "@/components/general/header/header";
import MobileNavbar from "@/components/general/navbar/mobileNavbar";
import Navbar from "@/components/general/navbar/navbar";
import NavBarLinks from "@/components/general/navbar/navbarLinks";
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
