"use client";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import Link from "next/link";
import module from "./navbar.module.css";
import { ActionIcon, Tooltip } from "@mantine/core";
import NavBarLinks from "./navbarLinks";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <div
      className={` flex flex-col pt-5 gap-5 items-center px-4 bg-slate-800 h-full ${module.navbarBg}`}
    >
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
  );
}
