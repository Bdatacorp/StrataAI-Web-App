"use client";
import {
  initialState,
  toggleMobileNavBar,
} from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const opened = useSelector(
    (state: RootState) => state.ui.isMobileNavBarOpened
  );
  const dispatch = useDispatch();

  return (
    <div className="flex items-center py-2 relative">
      <div className="md:hidden absolute left-2">
        <Burger
          opened={opened}
          onClick={() => dispatch(toggleMobileNavBar())}
          aria-label="Toggle navigation"
        />
      </div>
      <div className="w-full flex justify-center md:justify-start gap-3 items-center px-5">
        <div>
          <Image
            src={"/img/Strata-Logo.png"}
            alt="Strata Logo"
            width={35}
            height={35}
          />
        </div>
        <div className="font-bold text-secondary">
          Strata <span className="text-primary">Chat AI</span>
        </div>
      </div>
    </div>
  );
}
