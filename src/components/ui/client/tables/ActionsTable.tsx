import React from "react";
import { useState } from "react";
import { Table, Checkbox } from "@mantine/core";
import Link from "next/link";
import { Progress } from "@mantine/core";
import { BsEyeFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/system";

const elements = [
  {
    id: 1,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
  {
    id: 2,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
  {
    id: 3,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
  {
    id: 4,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
  {
    id: 5,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
  {
    id: 6,
    date: "table body",
    username: "table body",
    quantity: "table body",
    balance: "table body",
  },
];

const CustomMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    border: "1px solid #0000001C",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
    fontFamily: "var(--font-inter)",
  },
}));

const ActionsTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.id}
      bg={
        selectedRows.includes(element.id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((product) => product !== element.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.username}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.quantity}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      <Table.Td>
        <div className="flex items-center gap-2">
          <Tooltip title="Edit">
            <IconButton>
              <div>
                <MdEdit className="text-xl cursor-pointer text-Primary hover:text-Primary/90" />
              </div>
            </IconButton>
          </Tooltip>

          <div>
            <IconButton onClick={handleOpen}>
              <BsThreeDotsVertical className="text-xl cursor-pointer text-Primary" />
            </IconButton>

            <CustomMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              className="custom-menu"
            >
              <div className="flex flex-col px-4">
                <div>
                  <span className="text-[14px] font-[600] text-Danger cursor-pointer hover:text-Danger/90 Inter">
                    Delete
                  </span>
                </div>
                <div>
                  <span className="text-[14px] font-[600] text-Danger cursor-pointer hover:text-Danger/90 Inter">
                    Disable
                  </span>
                </div>
              </div>
            </CustomMenu>
          </div>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-7 table-container">
      <Table verticalSpacing="sm" highlightOnHover withRowBorders={false}>
        <Table.Thead>
          <Table.Tr bg={"#F4F6F8"} className="text-[#5E7080]">
            <Table.Th>#</Table.Th>
            <Table.Th>ID</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Balance</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default ActionsTable;
