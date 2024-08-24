import { NavBarContentTypeEnum } from "../type";
import DesktopNavbar from "./desktop/desktopNavbar";

import MobileNavbar from "./mobile/mobileNavbar";

export default function NavbarClient({
  sessions,
  activeSession,
  type,
  token,
  loading,
}: {
  sessions: any[];
  activeSession: string;
  type: NavBarContentTypeEnum;
  token?: string;
  loading?:boolean,
}) {
  return (
    <>
      <div className="hidden md:block min-w-[23%] max-w-[23%] max-h-full relative">
        <DesktopNavbar
          type={type}
          activeSession={activeSession}
          sessions={sessions}
          token={token}
          loading={loading}
        />
      </div>
      <div className="hidden h-full">
        <MobileNavbar
          type={type}
          activeSession={activeSession}
          sessions={sessions}
          token={token}
          loading={loading}
        />
      </div>
    </>
  );
}
