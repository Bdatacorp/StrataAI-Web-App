import ChatClientPDF from "@/components/modules/chat/client/chatClientPDF";
import PDFViewer from "@/components/ui/webViewer/pdfViewer";

export default function ChatPage() {
  return (
    <div className="w-full h-full flex gap-5">
      <div className="w-full lg:w-[40%]">
        <ChatClientPDF />
      </div>
      <div></div>
    </div>
  );
}
