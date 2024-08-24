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
import { User } from "@/server/app/users/users.types";
import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function UserClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const router = useRouter();
  const actions: TableActionIconsProps = {};

  const handleViewChat = async (rowData: User) => {
    const res = await createMessageToken(rowData._id);

    if (res.status && res.payload.data.token) {
      router.push(
        Modules.ADMIN.USERS_MESSAGES.route + res.payload.data.token
      );
    } else {
      toast.error(res.payload.message || "Something Went Wrong");
    }
  };

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="View User Chat">
          <Button variant="light" color="cyan">
            View Chat
          </Button>
        </Tooltip>
      ),
      action: handleViewChat,
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
