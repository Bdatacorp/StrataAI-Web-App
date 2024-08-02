"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
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
      navigationRoute: "",
    },
    deleteAction: { action: deleteStateAction },
  };

  const handleUploadFileOnClick = async (rowData: any) => {
    dispatch(openUploadFileToStateModal(rowData._id));
  };

  const actionButton1: RowActionButton = {
    element: (
      <Tooltip color="gray" label="Upload New Documents">
        <Button variant="light" color="cyan">
          Upload File
        </Button>
      </Tooltip>
    ),
    action: handleUploadFileOnClick,
  };

  // const actionButton2: RowActionButton = {
  //   element: (
  //     <Tooltip color="gray" label="Assign Pre Uploaded Documents">
  //       <Button variant="light" color="cyan">
  //         Assign Files
  //       </Button>
  //     </Tooltip>
  //   ),
  //   action: handleTest,
  // };

  return (
    <>
      <DataTable
        actions={actions}
        columns={columns}
        rows={rows}
        actionButtons={[actionButton1]}
      />
    </>
  );
}
