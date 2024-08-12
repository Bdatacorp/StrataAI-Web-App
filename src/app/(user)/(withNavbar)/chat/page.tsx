import ChatClientPDF from "@/components/modules/user/chat/client/chatClientPDF";
import ChatFooter from "@/components/modules/user/chat/server/chatFooter";
import ChatPageWrapper from "@/components/modules/user/chat/server/chatPageWrapper";
import ChatServer from "@/components/modules/user/chat/server/chatServer";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

export default function ChatPage() {
  return (
    <ChatPageWrapper>
      <ChatClientPDF />
      <ChatServer />
    </ChatPageWrapper>
  );
}
