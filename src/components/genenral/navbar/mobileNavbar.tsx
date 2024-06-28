"use client";
import { ActionIcon, CloseButton, Drawer, Tooltip } from "@mantine/core";
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
      size="20%"
    >
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Body
          className={`h-full flex flex-col items-center ${module.navbarBg}`}
        >
          <div className="w-full flex justify-center mb-5">
            <ActionIcon
              onClick={() => dispatch(closeMobileNavBar())}
              color="#ffffff"
              variant="transparent"
            >
              <MdClose className="text-[30px]" />
            </ActionIcon>
          </div>

          <div className={`flex flex-col pt-5 gap-5 items-center px-4`}>
            {NavBarLinks.map(({ Icon, label, link, action }, index) => (
              <Tooltip label={label} position="right" key={index}>
                <ActionIcon variant="transparent">
                  {link ? (
                    <Link href={link}>
                      <Icon className="text-[30px] text-white" />
                    </Link>
                  ) : (
                    action && (
                      <Icon
                        onClick={() => dispatch(action())}
                        className="text-[30px] text-white cursor-pointer"
                      />
                    )
                  )}
                </ActionIcon>
              </Tooltip>
            ))}
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
