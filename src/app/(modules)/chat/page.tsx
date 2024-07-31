import ChatClient from "@/components/modules/user/chat/client/chatClient";
import ChatClientPDF from "@/components/modules/user/chat/client/chatClientPDF";
import ChatFooter from "@/components/modules/user/chat/server/chatFooter";
import ChatPageWrapper from "@/components/modules/user/chat/server/chatPageWrapper";
import PDFViewer from "@/components/ui/client/webViewer/pdfViewer";

export default function ChatPage() {
  return (
    <ChatPageWrapper>
      {/* <ChatClientPDF /> */}
      <ChatClient />
      <ChatFooter />
    </ChatPageWrapper>
  );
}
