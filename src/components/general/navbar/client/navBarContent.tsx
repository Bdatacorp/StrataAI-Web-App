"use client";

import { openConversation } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import deleteSessionAction from "@/server/actions/session/deleteSessionAction";
import categorizeDate from "@/utils/client/helper/timestampConvertToStringDate";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Menu,
  ScrollArea,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { signIn } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { PiPlusCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavBarContentTypeEnum } from "../type";
import createSessionMessageToken from "@/server/actions/user/createSessionMessageToken";
import { Modules } from "@/lib/config/modules";
import { Colors } from "@/lib/config/colors";

type GroupedSession = {
  date: string;
  sessions: any[];
};

export default function NavBarContent({
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
  const [groupedByDate, setGroupedByDate] = useState<GroupedSession[]>([]);
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState<boolean[]>([false]);
  const [loadingSessions, setLoadingSessions] = useState<
    { id: string; loading: boolean }[]
  >(sessions.map((session) => ({ id: session._id, loading: false })));
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

  const hanldeSetActiveSession = async (sessionId: string, index: any) => {
    setLoadingSessions((sessions) =>
      sessions.map((session: any) =>
        session.id === sessionId ? { ...session, loading: true } : session
      )
    );

    if (type === NavBarContentTypeEnum.Admin) {
      if (!token) return toast.error("Something Went Wrong");

      const res = await createSessionMessageToken(token, sessionId);

      if (res.status && res.payload.data.token) {
        router.push(
          Modules.ADMIN.USERS_MESSAGES.route + res.payload.data.token
        );
      } else {
        toast.error(res.payload.message || "Something Went Wrong");
      }
    } else {
      const result: any = await signIn("retrieveSession", {
        redirect: false,
        sessionId,
      });
      if (!result?.error) {
        window.location.reload();
      }
    }

    setLoadingSessions((sessions) =>
      sessions.map((session: any) =>
        session.id === sessionId ? { ...session, loading: false } : session
      )
    );
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
    <div className="h-[80svh] flex flex-col gap-6 relative">
      {type !== NavBarContentTypeEnum.Admin && (
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
      )}

      {groupedByDate.map((groupedSession: GroupedSession, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-1 mb-4">
          <div className="text-xs">{groupedSession.date}</div>
          <div className="flex flex-col gap-2">
            {groupedSession.sessions.map((session: any, sessionIndex) => (
              <div className="group flex gap-1 relative" key={sessionIndex}>
                <LoadingOverlay
                  loaderProps={{
                    size: "sm",
                    type: "dots",
                    color: Colors.primary,
                  }}
                  overlayProps={{ radius: "sm", blur: 1, color: "#475569" }}
                  visible={
                    loadingSessions.find(
                      (loadingSession) => loadingSession.id === session._id
                    )?.loading
                  }
                  color="gray"
                />
                <div
                  className={`w-full px-2 py-1 rounded-md truncate cursor-pointer
                     ${findActive(session._id) && "bg-slate-600"}
                     hover:bg-slate-600
                  `}
                  onClick={() =>
                    hanldeSetActiveSession(
                      session?._id,
                      loadingSessions.find(
                        (loadingSession) => loadingSession.id === session._id
                      )
                    )
                  }
                >
                  {session?.state?.name} | {session?.title}
                </div>

                {type !== NavBarContentTypeEnum.Admin && (
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
                            findActive(session._id)
                              ? toast.warning(
                                  "Unable to delete the active session."
                                )
                              : openDeleteModal(session._id, sessionIndex)
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
                )}

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
