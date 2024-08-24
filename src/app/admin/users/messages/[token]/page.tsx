import Header from "@/components/general/header/header";
import ModuleLayoutElement from "@/components/layouts/moduleLayout";
import AdminMessagesNavbar from "@/components/modules/admin/users/messages/server/adminMessagesNavbar";
import AdminMessagesServer from "@/components/modules/admin/users/messages/server/adminMessagesServer";
import ChatClientPDF from "@/components/modules/user/chat/client/chatClientPDF";
import ChatPageWrapper from "@/components/modules/user/chat/server/chatPageWrapper";

export default function ChatPage({ params }: { params: { token: string } }) {
  return (
    <ModuleLayoutElement
      header={<Header />}
      navbar={<AdminMessagesNavbar token={params.token} />}
    >
      <ChatPageWrapper>
        <ChatClientPDF />
        <AdminMessagesServer token={params.token} />
      </ChatPageWrapper>
    </ModuleLayoutElement>
  );
}
