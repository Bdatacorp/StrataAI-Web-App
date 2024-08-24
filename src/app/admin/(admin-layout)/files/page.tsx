import TableWrapper from "@/components/ui/client/table/warapper/tableWrapper";
import { Metadata } from "next";
import { Modules } from "@/lib/config/modules";
import FileModuleHeader from "@/components/modules/admin/files/client/fileModuleHeader";
import FileServerTable from "@/components/modules/admin/files/server/filesServerTable";
import UploadFileModal from "@/components/modules/admin/files/client/uploadFile/uploadFileModal";

export const metadata: Metadata = {
  title: Modules.ADMIN.STATE.title,
  description: Modules.ADMIN.STATE.description,
};

const FileModule = () => {
  return (
    <>
      <FileModuleHeader />

      <UploadFileModal/>

      <TableWrapper tableSection={<FileServerTable />} />
    </>
  );
};

export default FileModule;
