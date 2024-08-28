"use client";

import React, { useEffect, useRef, useState } from "react";
import { ClientMessage } from "../types";
import ChatMessage from "@/components/ui/client/message/message";
import PageAffix from "@/components/ui/client/pageAffix/pageAffix";
import { useWindowScroll } from "@mantine/hooks";

export default function ChatMessages({
  messages,
}: {
  messages: ClientMessage[];
}) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const firstMessageRef = useRef<HTMLDivElement | null>(null);

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFirstMessage = () => {
    if (firstMessageRef.current) {
      firstMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  return (
    <>
      <div className="w-full py-5 lg:p-10 h-[80svh] lg:h-[70svh] overflow-y-scroll styled-scrolbar">
        <div className="flex flex-col gap-4 px-4 lg:mx-20">
          <div className="mt-10 lg:mt-0" ref={firstMessageRef}></div>
          {messages.map((message, index) => (
            <div key={index}>
              <ChatMessage
                text={message.text}
                role={message.role}
                id={message.id}
                metadata={message.metadata}
              />
            </div>
          ))}
          <div ref={lastMessageRef}></div>
        </div>
        <PageAffix
          scrollToFirstMessage={scrollToFirstMessage}
          scrollToLastMessage={scrollToLastMessage}
        />
      </div>
    </>
  );
}
