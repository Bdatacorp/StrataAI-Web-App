"use client";
import {
  ActionIcon,
  Button,
  CloseButton,
  Drawer,
  LoadingOverlay,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileNavBar } from "@/lib/provider/features/ui/ui.slice";

import NavBarContent from "../navBarContent";
import { NavBarContentTypeEnum } from "../../type";
import { RootState } from "@/lib/provider/store";

export default function MobileNavbar({
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
  const opened = useSelector(
    (state: RootState) => state.ui.isMobileNavBarOpened
  );
  const dispatch = useDispatch();

  return (
    <Drawer.Root
      className={`md:hidden`}
      opened={opened}
      onClose={() => dispatch(closeMobileNavBar())}
      size="70%"
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Body className={`h-full flex flex-col bg-slate-800 relative`}>
          <LoadingOverlay visible={loading} />
          <div className="w-full flex justify-center mb-5">
            <ActionIcon
              onClick={() => dispatch(closeMobileNavBar())}
              color="#ffffff"
              variant="transparent"
            >
              <MdClose className="text-[30px]" />
            </ActionIcon>
          </div>

          <div
            className={`w-full flex flex-col pt-5 gap-5 h-full text-white capitalize overflow-y-auto`}
          >
            <NavBarContent
              type={type}
              sessions={sessions}
              activeSession={activeSession}
              token={token}
              loading={loading}
            />
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
