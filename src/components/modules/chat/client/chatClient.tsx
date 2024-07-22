"use client";

import { useSelector } from "react-redux";
import { message } from "../types";
import ChatMessages from "./chatMesseges";
import { RootState } from "@/lib/provider/store";

export default function ChatClient() {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return <ChatMessages messages={messages} />;
}
