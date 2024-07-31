"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import { deleteProductAction } from "@/server/actions/products/deleteProductAction";
import React from "react";

export default function StateClientTable({
  columns,
  rows,
}: {
  columns: TableColumns[];
  rows: TableRows;
}) {
  const actions: TableActionIconsProps = {
    view: {
      type: TableRowsActionTypes.NAVIGATION,
      navigationRoute: "",
    },
    deleteAction: deleteProductAction,
  };

  return (
    <>
      <DataTable actions={actions} columns={columns} rows={rows} />
    </>
  );
}
