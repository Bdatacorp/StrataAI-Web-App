"use client";

import React, { useEffect, useRef } from "react";
import { ClientMessage, MessageRoles } from "../types";
import ChatMessage from "@/components/ui/client/message/message";
import { ScrollArea } from "@mantine/core";

export default function ChatMessages({
  messages,
}: {
  messages: ClientMessage[];
}) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const scrollToLastMessage = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [messages]);

  return (
    <div className="w-full py-5 lg:p-10 h-[80vh]  overflow-scroll border">
      <div className="flex flex-col gap-4 px-4 lg:mx-20">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage
              text={message.text}
              role={message.role}
              id={message.id}
            />
          </div>
        ))}
        <div ref={lastMessageRef}></div>
      </div>
    </div>
  );
}
