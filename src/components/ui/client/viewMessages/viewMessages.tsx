import { MessageRoles } from "@/components/modules/user/chat/types";
import ChatMessage from "../message/message";
import { ResponseEvent } from "@/server/app/response-event/response-event.types";

export default function ViewMessages({
  responseEvent,
}: {
  responseEvent: ResponseEvent;
}) {
  return (
    <div className="w-full flex flex-col gap-4 h-screen overflow-x-auto">
      <div className="shadow p-2 flex flex-col gap-2 rounded-md py-4">
        <strong>User Message</strong>
        <ChatMessage
          text={responseEvent.userMessage.content.value as string}
          role={MessageRoles.User}
          id={responseEvent.userMessage._id as string}
        />
      </div>
      <div className="shadow p-2 flex flex-col gap-2 rounded-md">
        <strong>Assistant Response</strong>
        <ChatMessage
          text={responseEvent.assistantMessage.content.value as string}
          role={MessageRoles.Assistant}
          id={responseEvent.assistantMessage._id as string}
          metadata={responseEvent.assistantMessage.content.metadata}
        />
      </div>
    </div>
  );
}
