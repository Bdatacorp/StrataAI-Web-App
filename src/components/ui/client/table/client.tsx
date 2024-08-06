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
      <Table.ScrollContainer minWidth={500}>
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
              <Table.Th className="text-center">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{children}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
