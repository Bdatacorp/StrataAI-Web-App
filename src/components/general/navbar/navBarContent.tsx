"use client";

import { openConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import categorizeDate from "@/utils/client/helper/timestampConvertToStringDate";
import { Button, ScrollArea } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

type GroupedSession = {
  date: string;
  sessions: any[];
};

export default function NavBarContent({
  sessions,
  activeSession,
}: {
  sessions: any[];
  activeSession: string;
}) {
  const [groupedByDate, setGroupedByDate] = useState<GroupedSession[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {}, []);

  useEffect(() => {
    groupSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions]);

  async function groupSession() {
    const grouped = groupSessions(sessions);
    setGroupedByDate(grouped);
  }

  function groupSessions(sessionList: any[]) {
    const groupedSessions = sessionList.reduce(
      (
        acc: { [key: string]: { date: string; sessions: any[] } },
        session: any
      ) => {
        const date = new Date(session.createdAt).toDateString(); // Extracting date from createdAt
        if (!acc[date]) {
          acc[date] = { date, sessions: [] };
        }
        acc[date].sessions.push(session);
        return acc;
      },
      {}
    );

    // Convert the object values to an array and sort by date in descending order
    return Object.values(groupedSessions).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  function findActive(sessionId: string) {
    const currentSessionID = activeSession;
    return sessionId === currentSessionID;
  }

  const hanldeSetActiveSession = async (sessionId: string) => {
    const result: any = await signIn("retrieveSession", {
      redirect: false,
      sessionId,
    });
    if (!result?.error) {
      window.location.reload();
    }
  };

  return (
    <div className="h-[80vh] flex flex-col gap-6">
      <div>
        <Button
          onClick={() => dispatch(openConversation())}
          c="blue"
          variant="light"
          leftSection={<PiPlusCircleBold className="text-lg" />}
        >
          New Conversation
        </Button>
      </div>

      <ScrollArea className="grow">
        {groupedByDate.map((groupedSession: GroupedSession, groupIndex) => (
          <div key={groupIndex} className="flex flex-col gap-1 mb-4">
            <div className="text-xs">{groupedSession.date}</div>
            <div className="flex flex-col gap-2">
              {groupedSession.sessions.map((session: any, sessionIndex) => (
                <div className="flex flex-col gap-1 " key={sessionIndex}>
                  <div
                    className={`w-full px-2 py-1 rounded-md truncate cursor-pointer
                     ${findActive(session._id) && "bg-slate-600"}
                  `}
                    onClick={() => hanldeSetActiveSession(session._id)}
                  >
                    {session.state.name} | {session.title}
                  </div>
                  {/* <div className="text-xs px-2">state : {session.state}</div> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
