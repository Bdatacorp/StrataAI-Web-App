import Header from "@/components/general/header/header";
import { Card } from "@mantine/core";
import React, { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 bg-[#FCFCFC]">
      <Header />

      <div className="px-4 lg:px-20">
        <Card shadow="sm" padding="xl">
          {children}
        </Card>
      </div>
    </div>
  );
}
