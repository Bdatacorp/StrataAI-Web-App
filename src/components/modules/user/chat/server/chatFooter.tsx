"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";
import { ActionIcon, Textarea, TextInput } from "@mantine/core";
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { MdOutlineClear, MdSend } from "react-icons/md";
import Link from "next/link";
import { Modules } from "@/lib/config/modules";

export default function ChatFooter({
  handleSend,
  loading,
  messageInputError,
  setMessageInputError,
}: {
  handleSend: (text: string | undefined) => void;
  loading: boolean;
  messageInputError: string;
  setMessageInputError: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hanldeTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setMessageInputError("");
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      handleSend(inputRef.current?.value);
    }
  };

  const hanldeCancelButton = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="h-[20svh] overflow-y-auto w-full py-4 bg-white flex flex-col items-center justify-center gap-2">
      {/* <div className="hidden lg:flex w-full lg:w-[40%]"></div> */}

      <div className="w-full flex justify-center items-center gap-3 px-4 lg:px-20">
        <div>
          <ActionIcon
            loading={loading}
            onClick={hanldeCancelButton}
            size="lg"
            c="white"
            className="bg-secondary hover:bg-primary"
            radius={100}
          >
            <MdOutlineClear className="text-lg" />
          </ActionIcon>
        </div>
        <div className="grow">
          <Textarea
            autosize
            maxRows={2}
            name="text"
            ref={inputRef}
            error={messageInputError}
            radius="lg"
            placeholder="Ask Anything"
            onKeyDown={(e) => hanldeTextareaKeyDown(e)}
          />
        </div>
        <div>
          <ActionIcon
            loading={loading}
            onClick={() => {
              handleSend(inputRef.current?.value);
              hanldeCancelButton();
            }}
            size="lg"
            c="white"
            className="bg-primary hover:bg-secondary"
            radius={100}
          >
            <MdSend className="text-lg" />
          </ActionIcon>
        </div>
      </div>

      <div className="text-[10px] text-center px-4 lg:px-28">
        Strata Chat AI may occasionally provide inaccurate information. It is
        important to verify critical details and seek legal advice before making
        any decisions or taking action. By continuing, you agree to our{" "}
        <Link
          target="_blank"
          href={Modules.GUEST.TERMS.route}
          className="text-Accent font-[600]"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          target="_blank"
          href={Modules.GUEST.PRIVACY.route}
          className="text-Accent font-[600]"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-center justify-center flex-wrap">
        <span className="text-[#09132080]"></span>
      </div>
    </div>
  );
}
