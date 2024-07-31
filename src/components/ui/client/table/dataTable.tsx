import ClientDataTable from "./client";
import TableDataRows from "./tableRows";
import { TableActionIconsProps, TableColumns, TableRows } from "./types";

export default async function DataTable({
  columns,
  rows,
  actions,
}: {
  columns: TableColumns[];
  rows: TableRows;
  actions?: TableActionIconsProps;
}) {
  return (
    <div className="mt-7 table-container w-full h-full">
      <ClientDataTable columns={columns}>
        <TableDataRows actions={actions} rows={rows} columns={columns} />
      </ClientDataTable>
    </div>
  );
}
