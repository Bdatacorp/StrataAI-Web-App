import { TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import responseEventController from "@/server/app/response-event/response-event.controller";
import ResponseEventClientTable from "../client/responseEventClientTable";

async function FetchTable() {
  const data = await responseEventController.getAllEvents();

  const feedbackRows: TableRows = {
    data,
  };

  return <ResponseEventClientTable rows={feedbackRows} />;
}

const ResponseEventServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={[]} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default ResponseEventServerTable;
