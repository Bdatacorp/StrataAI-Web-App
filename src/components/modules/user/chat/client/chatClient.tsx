"use client";

import ChatMessages from "./chatMesseges";

import NewConversation from "./newConversation";

import GetStarted from "../../getStarted/getStarted";
import ChatFooter from "../server/chatFooter";

export default function ChatClient({ messages }: { messages: any[] }) {
  return (
    <>
      <NewConversation />
      <ChatMessages messages={messages} />
      <ChatFooter/>
    </>
  );
}
