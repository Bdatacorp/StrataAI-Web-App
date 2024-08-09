"use client";

import { openConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import deleteSessionAction from "@/server/actions/session/deleteSessionAction";
import categorizeDate from "@/utils/client/helper/timestampConvertToStringDate";
import { ActionIcon, Button, Menu, ScrollArea, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { signIn } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
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
  const [deleteLoading, setDeleteLoading] = useState<boolean[]>([false]);
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

    setDeleteLoading(sessions.map(() => false));

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

  const handleDelete = async (sessionId: string, sessionIndex: number) => {
    setDeleteLoading((prevData) => [
      ...prevData,
      (prevData[sessionIndex] = true),
    ]);
    const res = await deleteSessionAction(sessionId);
    setDeleteLoading((prevData) => [
      ...prevData,
      (prevData[sessionIndex] = false),
    ]);
  };

  const openDeleteModal = (sessionId: string, sessionIndex: number) =>
    modals.openConfirmModal({
      title: "Delete",
      centered: true,
      children: (
        <Text size="sm">
          {
            "Please confirm if you wish to proceed with deletion. This action is irreversible and cannot be undone"
          }
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Canceled"),
      onConfirm: () => handleDelete(sessionId, sessionIndex),
    });

  return (
    <div className="h-[80vh] flex flex-col gap-6">
      <div className="grid">
        <Button
          onClick={() => dispatch(openConversation())}
          c="blue"
          variant="light"
          leftSection={<PiPlusCircleBold className="text-lg" />}
        >
          New Conversation
        </Button>
      </div>

      {groupedByDate.map((groupedSession: GroupedSession, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-1 mb-4">
          <div className="text-xs">{groupedSession.date}</div>
          <div className="flex flex-col gap-2">
            {groupedSession.sessions.map((session: any, sessionIndex) => (
              <div className="group flex gap-1" key={sessionIndex}>
                <div
                  className={`w-full px-2 py-1 rounded-md truncate cursor-pointer
                     ${findActive(session._id) && "bg-slate-600"}
                     hover:bg-slate-600
                  `}
                  onClick={() => hanldeSetActiveSession(session._id)}
                >
                  {session.state.name} | {session.title}
                </div>

                <div>
                  <Menu shadow="md" width={100}>
                    <Menu.Target>
                      <ActionIcon color="white" variant="transparent">
                        <BsThreeDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown className="rounded-lg bg-gray-800">
                      <Menu.Item
                        className="grid p-2"
                        color="gray"
                        onClick={() =>
                          openDeleteModal(session._id, sessionIndex)
                        }
                      >
                        <Button
                          color="red"
                          size="compact-xs"
                          variant="transparent"
                          loading={deleteLoading[sessionIndex]}
                          loaderProps={{ type: "bars" }}
                          leftSection={<MdDelete />}
                          fullWidth
                        >
                          Delete
                        </Button>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>

                {/* <div className="hidden group-hover:flex absolute items-center right-0 justify-center">
                  <ActionIcon
                    loading={deleteLoading[sessionIndex]}
                    onClick={}
                    variant="transparent"
                    color="red"
                  >
                    <MdDelete />
                  </ActionIcon>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
