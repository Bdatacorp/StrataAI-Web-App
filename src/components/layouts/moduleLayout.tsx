import { ReactNode } from "react";

interface ModuleLayoutProps {
  children: ReactNode;
  header: ReactNode;
  navbar: ReactNode;
}

export default function ModuleLayoutElement({
  children,
  header,
  navbar,
}: ModuleLayoutProps) {
  return (
    <>
      <div className="w-full h-[100svh] flex flex-col">
        <div className="h-[10%] w-full">{header}</div>
        <div className="w-full flex h-[90svh] overflow-hidden">
          {navbar}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
