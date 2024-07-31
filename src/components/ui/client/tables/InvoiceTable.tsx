import React from "react";
import { useState } from "react";
import { Table, Checkbox } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Progress } from "@mantine/core";

const elements = [
  {
    id: 1,
    serialNumber: "SN2346939",
    rawMaterials: [
      { name: "material1", quantity: 10 },
      { name: "material2", quantity: 20 },
      { name: "material3", quantity: 30 },
    ],
    title: "20W LED Bulb",
    description: "p3 LED Bulb",
    unit: "20W",
    quantity: 100,
  },
  {
    id: 2,
    serialNumber: "SN2546939",
    rawMaterials: [
      { name: "material1", quantity: 10 },
      { name: "material2", quantity: 20 },
    ],
    title: "15W LED Bulb",
    description: "p3 LED Bulb",
    unit: "20W",
    quantity: 20,
  },
];

const InvoiceTable = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>
        <div className="flex flex-col gap-3">
          <div>
            <span>{element.serialNumber}</span>
          </div>
          <div className="flex flex-col gap-2">
            {element.rawMaterials.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span>{item.name}</span>
                <span>X</span>
                <span>{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </Table.Td>
      <Table.Td w={250}>{element.title}</Table.Td>
      <Table.Td w={250}>{element.description}</Table.Td>
      <Table.Td>{element.unit}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-7 table-container">
      <Table verticalSpacing="sm" withRowBorders={true}>
        <Table.Thead>
          <Table.Tr bg={"#F4F6F8"} className="text-[#5E7080]">
            <Table.Th>#</Table.Th>
            <Table.Th>Serial Number</Table.Th>
            <Table.Th w={250}>Title</Table.Th>
            <Table.Th w={250}>Description</Table.Th>
            <Table.Th>Unit</Table.Th>
            <Table.Th>Quantity</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
