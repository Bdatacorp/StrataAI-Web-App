import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import FeedbackModuleHeader from "@/components/modules/admin/feedbacks/client/feedbackModuleHeader";
import FeedbackServerTable from "@/components/modules/admin/feedbacks/server/feedbackServerTable";
import ViewMessagesModal from "@/components/ui/client/viewMesssages/viewMessagesModal";

export const metadata: Metadata = {
  title: Modules.ADMIN.FEEDBACKS.title,
  description: Modules.ADMIN.FEEDBACKS.description,
};

const FeedbacksModule = () => {
  return (
    <>
      <FeedbackModuleHeader />
      <ViewMessagesModal/>

      <TableWrapper tableSection={<FeedbackServerTable />} />
    </>
  );
};

export default FeedbacksModule;
