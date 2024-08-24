import { NavBarContentTypeEnum } from "../../type";
import NavBarContent from "../navBarContent";

export default function DesktopNavbar({
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
    <div
      className={`overflow-x-auto w-full flex flex-col pt-5 gap-5 px-2 bg-slate-800 h-full text-white capitalize`}
    >
      <NavBarContent
        activeSession={activeSession}
        sessions={sessions}
        type={type}
        token={token}
      />
    </div>
  );
}
