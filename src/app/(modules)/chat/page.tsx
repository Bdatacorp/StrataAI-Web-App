import ChatClient from "@/components/modules/chat/client/chatClient";
import ChatClientPDF from "@/components/modules/chat/client/chatClientPDF";
import ChatFooter from "@/components/modules/chat/server/chatFooter";
import ChatPageWrapper from "@/components/modules/chat/server/chatPageWrapper";
import ChatServer from "@/components/modules/chat/server/chatServer";
import PDFViewer from "@/components/ui/client/webViewer/pdfViewer";

export default function ChatPage() {
  return (
    <ChatPageWrapper>
      <ChatClientPDF />
      <ChatClient />
      <ChatFooter />
    </ChatPageWrapper>
  );
}
