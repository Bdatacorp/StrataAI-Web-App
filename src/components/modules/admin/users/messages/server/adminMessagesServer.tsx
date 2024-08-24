import { Suspense } from "react";
import ElementLoading from "@/components/ui/client/loading/elementLoading";
import chatController from "@/server/app/chat/chat.controller";
import ChatMessages from "../client/chatMesseges";
import {
  ClientMessage,
  MessageRoles,
} from "@/components/modules/user/chat/types";
import usersController from "@/server/app/users/users.controller";

async function FetchTable({ token }: { token: string }) {
  const messages = await usersController.getAllUserMessages(token);

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

  return <ChatMessages messages={formattedMessages} />;
}

const AdminMessagesServer = ({ token }: { token: string }) => {
  return (
    <>
      <Suspense fallback={<ElementLoading />}>
        <FetchTable token={token} />
      </Suspense>
    </>
  );
};

export default AdminMessagesServer;
