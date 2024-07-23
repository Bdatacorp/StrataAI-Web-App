import Link from "next/link";
import module from "./navbar.module.css";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import NavBarLinks from "./navbarLinks";
import { useDispatch } from "react-redux";
import { NavBarLinkTypes } from "./type";
import { PiPlus, PiPlusCircle, PiPlusCircleBold } from "react-icons/pi";
import NavBarContent from "./navBarContent";

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

export default function Navbar() {
  return (
    <div
      className={`w-full flex flex-col pt-5 gap-5 px-4 bg-slate-800 h-full text-white capitalize`}
    >
      <NavBarContent />
    </div>
  );
}
