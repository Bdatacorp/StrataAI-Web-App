"use client";

import React, { useEffect, useRef } from "react";
import { message, MessageRoles } from "../types";
import ChatMessage from "@/components/ui/client/message/message";

export default function ChatMessages({ messages }: { messages: message[] }) {
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
    <div className="w-full lg:w-[60%] p-10 h-[80vh]  overflow-scroll border">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <div
            ref={index === messages.length - 1 ? lastMessageRef : null}
            key={index}
          >
            <ChatMessage text={message.text} role={message.role} />
          </div>
        ))}
      </div>
    </div>
  );
}
