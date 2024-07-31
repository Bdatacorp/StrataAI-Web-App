"use client";

import { Table, Checkbox, Pagination, Skeleton } from "@mantine/core";
import ClientDataTable from "./client";
import { TableColumns } from "./types";

export default function DataTableLoading({
  columns,
}: {
  columns: TableColumns[];
}) {
  return (
    <>
      <div className="mt-7 table-container">
        <ClientDataTable columns={columns}>
          <Table.Tr>
            <Table.Td>
              <Skeleton height={20} />
            </Table.Td>
            {columns.map((column, index) => (
              <Table.Td key={index}>
                <Skeleton height={15} width="100%" />
              </Table.Td>
            ))}
            <Table.Td>
              <div className="flex items-center gap-2">
                <Skeleton circle height={24} width={24} />
                <Skeleton circle height={24} width={24} />
                <Skeleton circle height={24} width={24} />
              </div>
            </Table.Td>
          </Table.Tr>
        </ClientDataTable>
      </div>
    </>
  );
}
