"use client";

import { useSelector } from "react-redux";
import { message } from "../types";
import ChatMessages from "./chatMesseges";
import { RootState } from "@/lib/provider/store";
import NewConversation from "./newConversation";
import { useEffect } from "react";

export default function ChatClient() {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <>
      <NewConversation />
      <ChatMessages messages={messages} />
    </>
  );
}
