import React, { useState } from "react";
import { Table, Checkbox, Pagination } from "@mantine/core";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const elements = [
  {
    id: 1,
    date: "30.05.2024",
    description: "Orders",
    amount: "30000",
    balance: "25000",
  },
  {
    id: 2,
    date: "30.05.2024",
    description: "Supply",
    amount: "50000",
    balance: "30000",
  },
  {
    id: 3,
    date: "30.05.2024",
    description: "Orders",
    amount: "30000",
    balance: "25000",
  },
  {
    id: 4,
    date: "30.05.2024",
    description: "Supply",
    amount: "50000",
    balance: "30000",
  },
  {
    id: 5,
    date: "30.05.2024",
    description: "Orders",
    amount: "30000",
    balance: "25000",
  },
  {
    id: 6,
    date: "30.05.2024",
    description: "Supply",
    amount: "50000",
    balance: "30000",
  },
];

const PAGE_SIZE = 10; // ADJUST THE PAGE SIZE AS NEEDED

const ProductSinglePageTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(1);

  const start = (activePage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const paginatedElements = elements.slice(start, end);

  const rows = paginatedElements.map((element, index) => (
    <Table.Tr
      key={element.id}
      className={index % 2 === 0 ? "text-Danger" : "text-black"}
    >
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-2 table-container">
      <Table verticalSpacing="xs" highlightOnHover withRowBorders={false}>
        <Table.Thead>
          <Table.Tr bg={"#F4F6F8"} className="text-[#5E7080]">
            <Table.Th>Date</Table.Th>
            <Table.Th w={500}>Description</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Balance</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* <div className="flex justify-center items-center mt-4">
        <Pagination
          total={Math.ceil(elements.length / PAGE_SIZE)}
          value={activePage}
          onChange={setActivePage}
          className="mt-4"
          color="black"
          radius={"xl"}
        />
      </div> */}
    </div>
  );
};

export default ProductSinglePageTable;
