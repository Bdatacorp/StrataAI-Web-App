"use client";

import ChatClientPDF from "@/components/modules/user/chat/client/chatClientPDF";
import { MessageRoles } from "@/components/modules/user/chat/types";
import ChatMessage from "@/components/ui/client/message/message";
import { clearViewMessages } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { MessageMetadata } from "@/server/app/chat/chat.types";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

export default function ViewMessagesModal() {
  const dispatch = useDispatch();
  const viewMessages = useSelector((state: RootState) => state.ui.viewMessages);

  return (
    <>
      <ChatClientPDF />
      <Modal
        opened={viewMessages.opened}
        onClose={() => dispatch(clearViewMessages())}
        centered
        size={"70%"}
      >
        <div className="w-full flex flex-col gap-4 p-2">
          <div className="shadow p-2 flex flex-col gap-2 rounded-md py-4">
            <strong>User Message</strong>
            <ChatMessage
              text={viewMessages.messages?.userMessage.content.value as string}
              role={MessageRoles.User}
              id={viewMessages.messages?.userMessage._id as string}
            />
          </div>
          <div className="shadow p-2 flex flex-col gap-2 rounded-md">
            <strong>Assistant Response</strong>
            <ChatMessage
              text={
                viewMessages.messages?.assistantMessage.content.value as string
              }
              role={MessageRoles.Assistant}
              id={viewMessages.messages?.assistantMessage._id as string}
              metadata={
                viewMessages.messages?.assistantMessage.content.metadata
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
