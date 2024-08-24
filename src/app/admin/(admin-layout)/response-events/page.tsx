import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import FeedbackModuleHeader from "@/components/modules/admin/feedbacks/client/feedbackModuleHeader";
import FeedbackServerTable from "@/components/modules/admin/feedbacks/server/feedbackServerTable";
import ViewMessagesModal from "@/components/ui/client/viewMesssages/viewMessagesModal";
import ResponseEventModuleHeader from "@/components/modules/admin/response-event/client/responseEventModuleHeader";
import ResponseEventServerTable from "@/components/modules/admin/response-event/server/responseEventServerTable";

export const metadata: Metadata = {
  title: Modules.ADMIN.RESPONSE_EVENT.title,
  description: Modules.ADMIN.RESPONSE_EVENT.description,
};

const ResponseEventModule = () => {
  return (
    <>
      <ResponseEventModuleHeader />
      <ViewMessagesModal />

      <TableWrapper tableSection={<ResponseEventServerTable />} />
    </>
  );
};

export default ResponseEventModule;
