import Header from "@/components/general/header/header";
import Navbar from "@/components/general/navbar/navbar";

import ModuleLayoutElement from "@/components/layouts/moduleLayout";

import { ReactNode } from "react";

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleLayoutElement header={<Header />} navbar={<Navbar />}>
      {children}
    </ModuleLayoutElement>
  );
}
