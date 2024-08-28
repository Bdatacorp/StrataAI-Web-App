import Header from "@/components/general/header/header";
import NavbarServer from "@/components/general/navbar/server/navbarServer";
import ModuleLayoutElement from "@/components/layouts/moduleLayout";
import PageAffix from "@/components/ui/client/pageAffix/pageAffix";
import { ReactNode } from "react";

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleLayoutElement header={<Header />} navbar={<NavbarServer />}>
      {children}
    </ModuleLayoutElement>
  );
}
