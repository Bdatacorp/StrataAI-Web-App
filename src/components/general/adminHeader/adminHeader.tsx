"use client";

import React, { useState } from "react";
import { FaPowerOff, FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { ActionIcon, Burger, Drawer, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MobileSidebar from "../adminSideBar/MobileSidebar";
import getDate from "@/utils/client/services/getDate";
import Image from "next/image";
import { Colors } from "@/lib/config/colors";
import { signOut } from "next-auth/react";
import { BiMessage } from "react-icons/bi";
import Link from "next/link";
import { Modules } from "@/lib/config/modules";
import { RiMessage3Fill } from "react-icons/ri";

const AdminHeader = () => {
  // NAVBAR
  const [opened, { open, close }] = useDisclosure(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  const { formattedDateEnglish, greeting } = getDate();

  return (
    <div className="w-full h-full flex items-center lg:justify-between py-[10px] px-4 lg:px-6">
      <div className="grow md:w-auto flex md:justify-start gap-3 items-center">
        <Image
          src={"/img/strata-ai.png"}
          alt="Strata Logo"
          width={130}
          height={80}
        />
      </div>

      <div className="grow flex justify-end gap-4">
        <div className="hidden lg:flex flex-row  items-center md:gap-5 gap-1">
          <div>
            <p className="text-[15px] font-[600]">{`Welcome Back, ${greeting}`}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCalendarAlt />
            <p className="text-[15px] font-[600]">{formattedDateEnglish}</p>
          </div>
        </div>

        {/* Mobile Drawer Menu */}

        <div className=" flex items-center gap-6  lg:hidden">
          <Burger
            size="md"
            opened={opened}
            onClick={open}
            aria-label="Toggle navigation"
          />

          <Drawer
            opened={opened}
            size="70%"
            onClose={close}
            title={
              <Image
                width={100}
                height={50}
                src="/img/strata-ai.png"
                alt="Strata-Logo"
              />
            }
          >
            <MobileSidebar />
          </Drawer>
        </div>

        <div className="flex items-center gap-4 ">
          <div className="flex items-center">
            <Link href={Modules.USER.CHAT.route} target="_blank">
              <Tooltip label="Visit Chat">
                <ActionIcon
                  color={Colors.secondary}
                  className=" animate__animated animate__jello animate__infinite"
                  variant="transparent"
                >
                  <RiMessage3Fill className="text-2xl" />
                </ActionIcon>
              </Tooltip>
            </Link>
          </div>

          {/* Logout */}
          <div className="flex items-center">
            <Tooltip label="Logout">
              <ActionIcon
                variant="transparent"
                loading={logoutLoading}
                color={Colors.primary}
                onClick={() => {
                  setLogoutLoading(true);
                  signOut();
                }}
              >
                <FaPowerOff className="text-xl" />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
