"use client";
import { Colors } from "@/lib/config/colors";
import { Modules } from "@/lib/config/modules";
import {
  initialState,
  toggleMobileNavBar,
  toggleStreamingResponse,
} from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import getDate from "@/utils/client/services/getDate";
import { ActionIcon, Burger, Switch, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { FaPowerOff, FaRegCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const mobileNavbarOpend = useSelector(
    (state: RootState) => state.ui.isMobileNavBarOpened
  );
  const streamingResponse = useSelector(
    (state: RootState) => state.ui.streamingResponse
  );
  const dispatch = useDispatch();
  const { formattedDateEnglish, greeting } = getDate();

  return (
    <div className="w-full h-full flex items-center lg:justify-between px-4 lg:px-6 border ">
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
            opened={mobileNavbarOpend}
            onClick={() => dispatch(toggleMobileNavBar())}
            aria-label="Toggle navigation"
          />
        </div>

        <div className="flex items-center gap-4 ">
          {/* Logout */}
          <div className="flex items-center">
            <Tooltip label="Logout">
              <ActionIcon
                variant="transparent"
                loading={logoutLoading}
                color={Colors.secondary}
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
}
