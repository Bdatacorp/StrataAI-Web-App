import React, { ReactNode } from "react";

export default function ChatPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full grow flex flex-col relative bg-[#EFEFEF]">
      {children}
    </div>
  );
}
