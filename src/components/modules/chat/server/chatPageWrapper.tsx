import React, { ReactNode } from "react";

export default function ChatPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-5 relative bg-[#EFEFEF]">
      {children}
    </div>
  );
}
