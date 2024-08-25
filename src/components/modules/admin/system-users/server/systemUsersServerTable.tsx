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
    maxWidth: 10,
  },
  {
    label: "Email",
    dataColumn: UserColumnEnum.email,
    maxWidth: 10,
  },

  {
    label: "User Role",
    dataColumn: UserColumnEnum.role,
    maxWidth: 10,
  },

  {
    label: "Last Acivity",
    dataColumn: UserColumnEnum.latestActivity,
    minWidth: 20,
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
