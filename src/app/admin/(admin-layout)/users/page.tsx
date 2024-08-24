import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import UsersModuleHeader from "@/components/modules/admin/users/client/userModuleHeader";
import UserServerTable from "@/components/modules/admin/users/server/usersServerTable";

export const metadata: Metadata = {
  title: Modules.ADMIN.USERS.title,
  description: Modules.ADMIN.USERS.description,
};

const UsersModule = () => {
  return (
    <>
      <UsersModuleHeader />

      <TableWrapper tableSection={<UserServerTable />} />
    </>
  );
};

export default UsersModule;
