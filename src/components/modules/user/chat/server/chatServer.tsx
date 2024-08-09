import { TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";

import statesController from "@/server/app/state/state.controller";
import ChatClient from "../client/chatClient";
import PageLoading from "@/components/ui/client/loading/pageLoading";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import chatController from "@/server/app/chat/chat.controller";
import { ClientMessage, MessageRoles } from "../types";
import { initialSessionMessages } from "@/lib/config/messages";
import ChatClientStream from "../client/chatClientStream";

async function FetchTable() {
  const messages = await chatController.loadMessages();
  const states = await statesController.getAllState();

  const formattedStates = states.map((state) => ({
    value: state._id,
    label: state.name,
  }));

  const formattedMessages: ClientMessage[] = messages.map((message: any) => ({
    id: message._id,
    role: message.type,
    text: message.content.value,
  }));

  return (
    <ChatClientStream
      states={formattedStates}
      messages={
        formattedMessages.length === 0
          ? initialSessionMessages
          : formattedMessages
      }
    />
  );
}

const ChatServer = () => {
  return (
    <>
      <Suspense fallback={<ElementLoading />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default ChatServer;
