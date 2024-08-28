import { ReactNode } from "react";
import ClientDataTable from "./client";
import TableDataRows from "./tableRows";
import {
  DangerZoneElement,
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
} from "./types";

export default async function DataTable({
  columns,
  rows,
  actions,
  actionButtons,
  elements,
}: {
  columns: TableColumns[];
  rows: TableRows;
  actions?: TableActionIconsProps;
  actionButtons?: RowActionButton[];
  elements?: DangerZoneElement[];
}) {
  return (
    <div className="table-container w-full h-full mb-10">
      <ClientDataTable columns={columns}>
        <TableDataRows
          actions={actions}
          rows={rows}
          columns={columns}
          actionButtons={actionButtons}
          elements={elements}
        />
      </ClientDataTable>
    </div>
  );
}
