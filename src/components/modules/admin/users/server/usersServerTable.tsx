import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { FileColumnEnum } from "@/server/app/files/files.types";
import FileClientTable from "../client/usersClientTable";
import filesController from "@/server/app/files/files.controller";
import { UserColumnEnum } from "@/server/app/users/users.types";
import UserClientTable from "../client/usersClientTable";
import usersController from "@/server/app/users/users.controller";

const cloumns: TableColumns[] = [
  {
    label: "Name",
    dataColumn: UserColumnEnum.name,
  },
  {
    label: "Email",
    dataColumn: UserColumnEnum.email,
  },
  {
    label: "Phone",
    dataColumn: UserColumnEnum.phone,
  },
  {
    label: "User Type",
    dataColumn: UserColumnEnum.type,
  },
  {
    label: "User Role",
    dataColumn: UserColumnEnum.role,
  },
];

async function FetchTable() {
  const data = await usersController.getAllUsers();

  const files: TableRows = {
    data,
  };

  return <UserClientTable columns={cloumns} rows={files} />;
}

const UserServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={cloumns} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default UserServerTable