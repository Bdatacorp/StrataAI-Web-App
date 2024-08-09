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
import { openUploadFileToStateModal } from "@/lib/provider/features/state/state.slice";
import deleteStateAction from "@/server/actions/state/deleteStateAction";
import { Button, Tooltip } from "@mantine/core";
import React from "react";
import { useDispatch } from "react-redux";

export default function StateClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const dispatch = useDispatch();
  const actions: TableActionIconsProps = {
    view: {
      type: TableRowsActionTypes.NAVIGATION,
      navigationRoute: Modules.ADMIN.FILES_ACCOCIATED_STATE.route,
    },
    deleteAction: {
      action: deleteStateAction,
      confirmMessage:
        "Are you sure you want to delete? The files associated with states will not be deleted. You can remove them separately using the files module.",
    },
  };

  const handleUploadFileOnClick = async (rowData: any) => {
    dispatch(openUploadFileToStateModal(rowData._id));
  };

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="Upload New Documents">
          <Button variant="light" color="cyan">
            Upload Files
          </Button>
        </Tooltip>
      ),
      action: handleUploadFileOnClick,
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
