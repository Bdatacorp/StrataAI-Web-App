"use client";

import { setActiveSession } from "@/lib/provider/features/chat/chat.slice";
import { openConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import categorizeDate from "@/utils/client/helper/timestampConvertToStringDate";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

type GroupedSession = {
  date: string;
  sessions: any[];
};

export default function NavBarContent() {
  const [groupedByDate, setGroupedByDate] = useState<GroupedSession[]>([]);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    getThreads();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  async function getThreads() {
    // const result = await loadSessions();
    const result: any = {};
    // const payload = result.payload;
    // const sessions = payload.map((thread: any) => {
    //   return {
    //     ...thread,
    //     active: findActive(thread.session_id),
    //     date: categorizeDate(thread.created_at),
    //   };
    // });
    // const grouped = groupSessions(sessions);
    // setGroupedByDate(grouped);
  }

  function groupSessions(sessionList: any[]) {
    return Object.values(
      sessionList.reduce(
        (
          acc: { [key: string]: { date: string; sessions: any[] } },
          session: any
        ) => {
          if (!acc[session.date]) {
            acc[session.date] = { date: session.date, sessions: [] };
          }
          acc[session.date].sessions.push(session);
          return acc;
        },
        {}
      )
    );
  }

  function findActive(sessionID: string) {
    const currentSessionID = localStorage.getItem("session_id") as string;
    return sessionID === currentSessionID;
  }

  const hanldeSetActiveSession = (sessionID: string) => {
    dispatch(setActiveSession(sessionID));
  };

  return (
    <>
      <Button
        onClick={() => dispatch(openConversation())}
        c="blue"
        variant="light"
        leftSection={<PiPlusCircleBold className="text-lg" />}
      >
        New Conversation
      </Button>

      {groupedByDate.map((groupedSession: GroupedSession, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-1">
          <div className="text-xs">{groupedSession.date}</div>
          <div className="flex flex-col gap-2">
            {groupedSession.sessions.map((session: any, sessionIndex) => (
              <div className="flex flex-col gap-1 " key={sessionIndex}>
                <div
                  className={`w-full px-2 py-1 rounded-md truncate cursor-pointer
                     ${session.active && "bg-slate-600"}
                  `}
                  onClick={() => hanldeSetActiveSession(session.session_id)}
                >
                  {session.state} | {session.title}
                </div>
                {/* <div className="text-xs px-2">state : {session.state}</div> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
