import { ReactNode } from "react";

interface ModuleLayoutProps {
  children: ReactNode;
  header: ReactNode;
  navbar: ReactNode;
  mobileNavbar: ReactNode;
}

export default function ModuleLayoutElement({
  children,
  header,
  navbar,
  mobileNavbar,
}: ModuleLayoutProps) {
  return (
    <>
      <div className="w-full h-[100svh] flex flex-col">
        <div className="h-[10%] w-full">{header}</div>
        <div className="w-full flex grow">
          <div className="hidden md:block min-w-[23%] max-w-[23%] max-h-full relative">
            {navbar}
          </div>
          <div className="hidden h-full">{mobileNavbar}</div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
