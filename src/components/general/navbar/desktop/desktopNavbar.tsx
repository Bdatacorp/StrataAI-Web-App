import NavBarContent from "../navBarContent";

export default function DesktopNavbar({
  sessions,
  activeSession,
}: {
  sessions: any[];
  activeSession: string;
}) {
  return (
    <div
      className={`overflow-x-auto w-full flex flex-col pt-5 gap-5 px-2 bg-slate-800 h-full text-white capitalize`}
    >
      <NavBarContent activeSession={activeSession} sessions={sessions} />
    </div>
  );
}
