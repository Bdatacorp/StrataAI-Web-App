import { Suspense } from "react";
import sessionController from "@/server/app/session/session.controller";
import NavBarContent from "@/components/general/navbar/navBarContent";
import usersController from "@/server/app/users/users.controller";

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

async function FetchSessions({ token }: { token: string }) {
  "use server";

  const sessions = await usersController.getAllUserSessions(token);

  return <NavBarContent activeSession={""} sessions={sessions} />;
}


export default function AdminMessagesNavbar({ token }: { token: string }) {
  return (
    <div
      className={`overflow-x-auto w-full flex flex-col pt-5 gap-5 px-2 bg-slate-800 h-full text-white capitalize`}
    >
      <Suspense>
        <FetchSessions token={token} />
      </Suspense>
    </div>
  );
}
