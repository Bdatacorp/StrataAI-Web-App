"use client";
import {
  ActionIcon,
  Button,
  CloseButton,
  Drawer,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import module from "./navbar.module.css";
import NavBarLinks from "./navbarLinks";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  closeMobileNavBar,
  initialState,
} from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { NavBarLinkTypes } from "./type";
import { PiPlusCircleBold } from "react-icons/pi";
import NavBarContent from "./navBarContent";



export default function MobileNavbar() {
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
        <Drawer.Body className={`h-full flex flex-col bg-slate-800`}>
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
            className={`w-full flex flex-col pt-5 gap-5 h-full text-white capitalize`}
          >
<NavBarContent/>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
