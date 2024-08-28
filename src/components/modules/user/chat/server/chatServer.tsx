import { Suspense } from "react";
import statesController from "@/server/app/state/state.controller";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import chatController from "@/server/app/chat/chat.controller";
import { ClientMessage, MessageRoles } from "../types";
import { initialSessionMessages } from "@/lib/config/messages";
import ChatClientWrapper from "../client/chatClientWrapper";

async function FetchTable() {
  const messages = await chatController.loadMessages();
  const states = await statesController.getAllState();

  const formattedStates = states.map((state) => ({
    value: state._id,
    label: state.name,
  }));

  const formattedMessages: ClientMessage[] = messages.map((message: any) => {
    return {
      id: message._id,
      role: message.type,
      text: message.content.value,
      metadata:
        message.type === MessageRoles.Assistant
          ? message.content.metadata
          : null,
    };
  });

  return (
    <ChatClientWrapper
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
