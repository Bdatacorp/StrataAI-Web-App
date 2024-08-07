"use client";
import { Colors } from "@/lib/config/colors";
import {
  initialState,
  toggleMobileNavBar,
  toggleStreamingResponse,
} from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { ActionIcon, Burger, Switch, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
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

  return (
    <div className="w-full flex items-center py-2 relative justify-between">
      <div className="md:hidden absolute left-2">
        <Burger
          opened={mobileNavbarOpend}
          onClick={() => dispatch(toggleMobileNavBar())}
          aria-label="Toggle navigation"
        />
      </div>
      <div className="w-full md:w-auto flex justify-center md:justify-start gap-3 items-center px-5">
        <div>
          <Image
            src={"/img/strata-ai.png"}
            alt="Strata Logo"
            width={120}
            height={35}
          />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center gap-3 px-10">
        <Switch
          color="gray"
          labelPosition="left"
          checked={streamingResponse}
          onChange={() => dispatch(toggleStreamingResponse())}
          label="Streaming Response"
        />
        <Tooltip color="gray" label="Logout">
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
        </Tooltip>
      </div>
      <div className="md:hidden px-10">
        <Tooltip label="Streaming Response" refProp="rootRef">
          <Switch
            checked={streamingResponse}
            onChange={() => dispatch(toggleStreamingResponse())}
            color="gray"
            defaultChecked
          />
        </Tooltip>
      </div>
    </div>
  );
}
