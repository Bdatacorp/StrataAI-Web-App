import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { UserColumnEnum } from "@/server/app/users/users.types";
import usersController from "@/server/app/users/users.controller";
import SystemUsersClientTable from "../client/systemUsersClientTable";

const cloumns: TableColumns[] = [
  {
    label: "Name",
    dataColumn: UserColumnEnum.name,
    maxWidth:40
  },
  {
    label: "Email",
    dataColumn: UserColumnEnum.email,
    maxWidth:40
  },

  {
    label: "User Role",
    dataColumn: UserColumnEnum.role,
    width: 20,
  },

  {
    label: "Last Acivity",
    dataColumn: UserColumnEnum.latestActivity,
    width: 50,
  },
];

async function FetchTable() {
  const data = await usersController.getAllSystemUsers();

  const files: TableRows = {
    data,
  };

  return <SystemUsersClientTable columns={cloumns} rows={files} />;
}

const SystemUsersServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={cloumns} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default SystemUsersServerTable;
