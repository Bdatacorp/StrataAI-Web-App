import authController from "@/server/app/auth/auth.controller";
import NavBarContent from "./navBarContent";
import { Suspense } from "react";
import ElementLoading from "@/components/ui/client/loading/elementLoading";

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
  const sessions = await authController.loadAllSessions();
  console.log(sessions);

  return <NavBarContent sessions={sessions} />;
}

export default function Navbar() {
  return (
    <div
      className={`w-full flex flex-col pt-5 gap-5 px-4 bg-slate-800 h-full text-white capitalize`}
    >
      <Suspense fallback={<ElementLoading />}>
        <FetchSessions />
      </Suspense>
    </div>
  );
}
