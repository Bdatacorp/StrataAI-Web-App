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
      <div className="w-full h-screen flex flex-col">
        <div className="h-[10%] w-full">{header}</div>
        <div className="h-full w-full">
          <div className="flex h-full">
            <div className="hidden md:block w-20 h-full">{navbar}</div>
            <div className="hidden h-full">{mobileNavbar}</div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
