"use client";

import { useSelector } from "react-redux";
import { ClientMessage } from "../types";
import ChatClientStream from "./chatClientStream";
import { RootState } from "@/lib/provider/store";
import ChatClient from "./chatClient";

export default function ChatClientWrapper({
  messages,
  states,
}: {
  states: { value: string; label: string }[];
  messages: ClientMessage[];
}) {
  const isStreamEnabled = useSelector(
    (state: RootState) => state.ui.streamingResponse
  );

  return isStreamEnabled ? (
    <ChatClientStream states={states} messages={messages} />
  ) : (
    <ChatClient states={states} messages={messages} />
  );
}
