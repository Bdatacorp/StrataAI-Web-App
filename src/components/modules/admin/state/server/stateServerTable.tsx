import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { StateColumnEnum } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";
import StateClientTable from "../client/stateClientTable";

const cloumns: TableColumns[] = [
  {
    label: "State",
    dataColumn: StateColumnEnum.name,
    maxWidth: 80,
  },
  {
    label: "Create at",
    dataColumn: StateColumnEnum.createdAt,
    maxWidth: 80,
  },
  {
    label: "Status",
    dataColumn: StateColumnEnum.status,
    center: true,
  },
];

async function FetchTable() {
  const data = await statesController.getAllState();

  const stateRows: TableRows = {
    data,
  };

  return <StateClientTable  columns={cloumns} rows={stateRows} />;
}

const StateServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={cloumns} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default StateServerTable;
