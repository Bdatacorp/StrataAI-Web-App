import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { FileColumnEnum } from "@/server/app/files/files.types";
import filesController from "@/server/app/files/files.controller";
import StateFileClientTable from "../client/stateFilesClientTable";
import statesController from "@/server/app/state/state.controller";
import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import StateFilesModuleHeader from "../client/stateFilesModuleHeader";
import PageLoading from "@/components/ui/client/loading/pageLoading";

const cloumns: TableColumns[] = [
  {
    label: "Filename",
    dataColumn: FileColumnEnum.filename,
    maxWidth: 10,
  },
  
];

async function FetchTable({ stateId }: { stateId: string }) {
  const data: any = await statesController.getAssociatedFiles(stateId);

  const files: TableRows = {
    data: data.files,
  };

  return (
    <>
      <StateFilesModuleHeader stateName={data.state} stateId={stateId} />
      <TableWrapper
        tableSection={<StateFileClientTable columns={cloumns} rows={files} />}
      />
    </>
  );
}

const StateFilesServerTable = ({ stateId }: { stateId: string }) => {
  return (
    <>
      <Suspense fallback={<PageLoading isFade />}>
        <FetchTable stateId={stateId} />
      </Suspense>
    </>
  );
};

export default StateFilesServerTable;
