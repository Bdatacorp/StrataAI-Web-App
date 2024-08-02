import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { StateColumnEnum } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";
import StateClientTable from "../client/stateClientTable";
import Token from "@/utils/helper/token/clientToken";
import { cookies } from "next/headers";


const cloumns: TableColumns[] = [
  {
    label: "State",
    dataColumn: StateColumnEnum.name,
  },
  {
    label: "Created at",
    dataColumn: StateColumnEnum.createdAt,
  },
  {
    label: "Updated at",
    dataColumn: StateColumnEnum.updatedAt,
  },
];

async function FetchTable() {
  const data = await statesController.getAllState();

  const stateRows: TableRows = {
    data,
  };

  return <StateClientTable columns={cloumns} rows={stateRows} />;
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
