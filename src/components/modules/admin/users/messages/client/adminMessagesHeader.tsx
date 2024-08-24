"use client";
import { Colors } from "@/lib/config/colors";
import { Modules } from "@/lib/config/modules";
import {
  initialState,
  toggleMobileNavBar,
  toggleStreamingResponse,
} from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import {
  ActionIcon,
  Burger,
  Button,
  Switch,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function AdminMessagesHeader() {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const mobileNavbarOpend = useSelector(
    (state: RootState) => state.ui.isMobileNavBarOpened
  );
  const dispatch = useDispatch();
  const router = useRouter();

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
        <strong className="hidden md:block">{"User Chat"}</strong>
      </div>
      <div className="hidden md:flex justify-center items-center gap-6 px-10">
        <Tooltip color="gray" label="Close">
          <Button
            color={Colors.primary}
            rightSection={<MdClose />}
            onClick={() => router.push(Modules.ADMIN.USERS.route)}
          >
            Close
          </Button>
        </Tooltip>
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
    </div>
  );
}
