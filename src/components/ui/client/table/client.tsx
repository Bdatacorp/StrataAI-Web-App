"use client";

import { Table } from "@mantine/core";
import React, { ReactNode } from "react";
import { TableColumns } from "./types";

export default function ClientDataTable({
  children,
  columns,
}: Readonly<{
  children: React.ReactNode;
  columns: TableColumns[];
}>) {
  return (
    <>
      <Table
        verticalSpacing="sm"
        highlightOnHover
        withRowBorders={false}
        striped
      >
        <Table.Thead>
          <Table.Tr bg={"#F4F6F8"} className="text-[#5E7080]">
            <Table.Th>#</Table.Th>
            {columns.map((column, index) => (
              <Table.Th key={index}>{column.label}</Table.Th>
            ))}
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{children}</Table.Tbody>
      </Table>
      {/* {filteredElements.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <Pagination
            total={Math.ceil(filteredElements.length / PAGE_SIZE)}
            value={activePage}
            onChange={setActivePage}
            className="mt-4"
            color="black"
            radius={"xl"}
          />
        </div>
      )} */}
    </>
  );
}
