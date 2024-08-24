"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import { Modules } from "@/lib/config/modules";
import deleteFileAction from "@/server/actions/files/deleteFileAction";
import createMessageToken from "@/server/actions/user/createMessageToken";
import deleteAdminAction from "@/server/actions/user/deleteAdminAction";
import { User } from "@/server/app/users/users.types";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SystemUsersClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const router = useRouter();
  const actions: TableActionIconsProps = {
    deleteAction: {
      action: deleteAdminAction,
      confirmMessage:
        "Are you sure you want to delete? The files associated with states will not be deleted. You can remove them separately using the files module.",
    },
  };

  return (
    <>
      <DataTable actions={actions} columns={columns} rows={rows} />
    </>
  );
}
