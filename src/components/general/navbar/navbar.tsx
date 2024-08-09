import NavBarContent from "./navBarContent";
import { Suspense } from "react";
import sessionController from "@/server/app/session/session.controller";

export interface ClientSession {
  id: number;
  title: string;
  thread_id?: string;
  state: string;
  date: string;
  active: boolean;
}

type GroupedSession = {
  date: string;
  sessions: ClientSession[];
};

async function FetchSessions() {
  "use server";
  const sessions = await sessionController.loadAllSessions();
  const activeSession = await sessionController.findActiveSession();
  return <NavBarContent activeSession={activeSession} sessions={sessions} />;
}

export default function Navbar() {
  return (
    <div
      className={`w-full flex flex-col pt-5 gap-5 px-3 bg-slate-800 h-full text-white capitalize`}
    >
      <Suspense>
        <FetchSessions />
      </Suspense>
    </div>
  );
}
