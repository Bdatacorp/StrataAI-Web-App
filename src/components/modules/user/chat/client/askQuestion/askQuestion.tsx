"use client";

import { ActionIcon, Input, TextInput } from "@mantine/core";
import React, { useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function AskQuestion() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageInputError, setMessageInputError] = useState<string>();

  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-center items-center gap-3 px-4 lg:px-20">
        <div>
          <ActionIcon size="lg" c="white" className="bg-secondary" radius={100}>
            {/* <SiCleaner className="text-lg" /> */}
          </ActionIcon>
        </div>
        <div className="grow">
          <TextInput
            name="text"
            ref={inputRef}
            error={messageInputError}
            radius="xl"
            placeholder="Ask Anything"
          />
        </div>
        <div>
          <ActionIcon
            type="submit"
            size="lg"
            c="white"
            className="bg-primary"
            radius={100}
          >
            <MdSend className="text-lg" />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}
