import { Button } from "@mantine/core";
import { PiPlusCircleBold } from "react-icons/pi";

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

const sessionList: ClientSession[] = [
  {
    id: 1,
    title: "Hello! How can I help you today?",
    state: "victoria",
    date: "today",
    active: true,
  },
  {
    id: 2,
    title: "Hello! How can I help you todayyyyyyyyy?",
    state: "sidney",
    date: "yesterday",
    active: false,
  },
];

const groupedByDate: GroupedSession[] = Object.values(
  sessionList.reduce(
    (
      acc: { [key: string]: { date: string; sessions: ClientSession[] } },
      session: ClientSession
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

export default function NavBarContent() {
  return (
    <>
      <Button
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
            {groupedSession.sessions.map(
              (session: ClientSession, sessionIndex) => (
                <div className="flex flex-col gap-1 " key={sessionIndex}>
                  <div
                    className={`w-full px-2 py-1 rounded-md truncate cursor-pointer
                    ${session.active && "bg-slate-600"}
                  `}
                  >
                    {session.state} | {session.title}
                  </div>
                  {/* <div className="text-xs px-2">state : {session.state}</div> */}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}
