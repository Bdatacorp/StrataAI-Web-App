"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import deleteFileAction from "@/server/actions/files/deleteFileAction";
import { ActionIcon, Tooltip } from "@mantine/core";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";

export default function UserClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const router = useRouter();
  const actions: TableActionIconsProps = {
    deleteAction: { action: deleteFileAction },
  };

  return (
    <>
      <DataTable
        actions={actions}
        columns={columns}
        rows={rows}
      />
    </>
  );
}
