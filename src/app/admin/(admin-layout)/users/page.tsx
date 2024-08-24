import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import FileModuleHeader from "@/components/modules/admin/files/client/fileModuleHeader";
import FileServerTable from "@/components/modules/admin/files/server/filesServerTable";
import UploadFileModal from "@/components/modules/admin/files/client/uploadFile/uploadFileModal";
import UsersModuleHeader from "@/components/modules/admin/users/client/userModuleHeader";
import UserServerTable from "@/components/modules/admin/users/server/usersServerTable";

export const metadata: Metadata = {
  title: Modules.ADMIN.STATE.title,
  description: Modules.ADMIN.STATE.description,
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
