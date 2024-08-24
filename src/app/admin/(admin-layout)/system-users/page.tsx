import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import SystemUsersModuleHeader from "@/components/modules/admin/system-users/client/systemUsersModuleHeader";
import SystemUsersServerTable from "@/components/modules/admin/system-users/server/systemUsersServerTable";
import SystemUsersCreate from "@/components/modules/admin/system-users/client/systemUsersCreate";

export const metadata: Metadata = {
  title: Modules.ADMIN.SYSTEM_USERS.title,
  description: Modules.ADMIN.SYSTEM_USERS.description,
};

const SystemUsersModule = () => {
  return (
    <>
      <SystemUsersModuleHeader />
<SystemUsersCreate/>
      <TableWrapper tableSection={<SystemUsersServerTable />} />
    </>
  );
};

export default SystemUsersModule;
