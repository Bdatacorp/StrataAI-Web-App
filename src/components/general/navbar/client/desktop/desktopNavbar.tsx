import { LoadingOverlay } from "@mantine/core";
import { NavBarContentTypeEnum } from "../../type";
import NavBarContent from "../navBarContent";

export default function DesktopNavbar({
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
  loading?: boolean;
}) {
  return (
    <div
      className={`overflow-y-auto w-full flex flex-col pt-5 gap-5 px-2 bg-slate-800 h-full text-white capitalize relative`}
    >
      <LoadingOverlay visible={loading} />
      <NavBarContent
        activeSession={activeSession}
        sessions={sessions}
        type={type}
        token={token}
        loading={loading}
      />
    </div>
  );
}
