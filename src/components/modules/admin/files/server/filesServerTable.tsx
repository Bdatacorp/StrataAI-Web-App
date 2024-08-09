import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { FileColumnEnum } from "@/server/app/files/files.types";
import FileClientTable from "../client/fileClientTable";
import filesController from "@/server/app/files/files.controller";

const cloumns: TableColumns[] = [
  {
    label: "Filename",
    dataColumn: FileColumnEnum.filename,
    maxWidth: 10,
  },
  {
    label: "File Id",
    dataColumn: FileColumnEnum.file_id,
  },
];

async function FetchTable() {
  const data = await filesController.getAllFiles();

  const files: TableRows = {
    data,
  };

  return <FileClientTable columns={cloumns} rows={files} />;
}

const FileServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={cloumns} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default FileServerTable;
