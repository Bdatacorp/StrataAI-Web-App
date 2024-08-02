"use client";

import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuSearch } from "react-icons/lu";
import { Modal } from "@mantine/core";
import SearchBox from "@/components/ui/client/searchBox/SearchBox";
import MobileSidebar from "../adminSideBar/MobileSidebar";
import getDate from "@/utils/client/services/getDate";
import Image from "next/image";
import { Colors } from "@/lib/config/colors";
import { signOut } from "next-auth/react";

const AdminHeader = () => {
  // NAVBAR
  const [opened, { open, close }] = useDisclosure(false);
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  // SEARCH
  const [searchOpened, { open: openSearch, close: closeSearch }] =
    useDisclosure(false);

  const { formattedDateEnglish, greeting } = getDate();

  return (
    <div className="flex items-center lg:justify-between py-[10px] px-4 lg:px-6">
      <div className="grow md:w-auto flex md:justify-start gap-3 items-center">
        <div>
          <Image
            src={"/img/Strata-Logo.png"}
            alt="Strata Logo"
            width={35}
            height={35}
          />
        </div>
        <div className="font-bold text-secondary">
          Strata <span className="text-primary">AI Admin</span>
        </div>
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

        {/* MOBILE SIDEBAR */}
        <div className=" flex items-center gap-6  lg:hidden">
          {/* MENU ICON */}
          <div className="w-fit" onClick={open}>
            <CgMenuLeft className="text-3xl" />
          </div>

          <Drawer opened={opened} size="70%" onClose={close}>
            <MobileSidebar />
          </Drawer>
        </div>

        {/* NOTIFICATIONS | SETTINGS | ACCOUNT */}
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-2">
            <ActionIcon
              loading={logoutLoading}
              color={Colors.primary}
              onClick={() => {
                setLogoutLoading(true);
                signOut();
              }}
              className="rounded-full w-8 h-8"
            >
              <AiOutlineLogout className="text-2xl" />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
