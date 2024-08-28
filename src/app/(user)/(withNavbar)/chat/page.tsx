import ChatClientPDF from "@/components/modules/user/chat/client/chatClientPDF";
import ChatPageWrapper from "@/components/modules/user/chat/server/chatPageWrapper";
import ChatServer from "@/components/modules/user/chat/server/chatServer";

export default function ChatPage() {
  return (
    <ChatPageWrapper>
      <ChatClientPDF />
      <ChatServer />
    </ChatPageWrapper>
  );
}
