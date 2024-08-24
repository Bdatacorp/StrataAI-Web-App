import { NavBarContentTypeEnum } from "../type";
import DesktopNavbar from "./desktop/desktopNavbar";

import MobileNavbar from "./mobile/mobileNavbar";

export default function NavbarClient({
  sessions,
  activeSession,
  type,
  token,
}: {
  sessions: any[];
  activeSession: string;
  type: NavBarContentTypeEnum;
  token?: string;
}) {
  return (
    <>
      <div className="hidden md:block min-w-[23%] max-w-[23%] max-h-full relative">
        <DesktopNavbar
          type={type}
          activeSession={activeSession}
          sessions={sessions}
          token={token}
        />
      </div>
      <div className="hidden h-full">
        <MobileNavbar
          type={type}
          activeSession={activeSession}
          sessions={sessions}
          token={token}
        />
      </div>
    </>
  );
}
