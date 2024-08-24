import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import feedbackController from "@/server/app/feedback/feedbacks.controller";
import {
  Feedback,
  FeedbackColumnEnum,
} from "@/server/app/feedback/feedback.types";
import FeedbackClientTable from "../client/feedbackClientTable";

async function FetchTable() {
  const data = await feedbackController.getAllFeedbacks();

  const feedbackRows: TableRows = {
    data,
  };

  return <FeedbackClientTable rows={feedbackRows} />;
}

const FeedbackServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={[]} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default FeedbackServerTable;
