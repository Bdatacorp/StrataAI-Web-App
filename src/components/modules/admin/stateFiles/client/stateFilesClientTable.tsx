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
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function StateFileClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const [unassignLoading, setUnassignLoading] = useState<boolean>(false);
  const router = useRouter();
  const actions: TableActionIconsProps = {
    deleteAction: { action: deleteFileAction },
  };

  const handleDownload = async (rowData: any) => {
    router.push(rowData.location);
  };

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="Download">
          <ActionIcon variant="transparent">
            <FaCloudDownloadAlt className="text-primary" />
          </ActionIcon>
        </Tooltip>
      ),
      action: handleDownload,
    },
  ];

  return (
    <>
      <DataTable
        actions={actions}
        columns={columns}
        rows={rows}
        actionButtons={actionButtons}
      />
    </>
  );
}
