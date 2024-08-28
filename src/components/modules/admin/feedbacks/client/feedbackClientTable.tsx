"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import ViewMessages from "@/components/ui/client/viewMessages/viewMessages";
import { FeedbackType } from "@/server/app/feedback/feedback.types";
import {
  Feedback,
  FeedbackColumnEnum,
} from "@/server/app/feedback/feedback.types";
import { ResponseEvent } from "@/server/app/response-event/response-event.types";
import { Button, Table, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function FeedbackClientTable({ rows }: { rows: TableRows }) {
  const dispatch = useDispatch();
  const actions: TableActionIconsProps = {};

  const hanldeClose = () => {
    modals.closeAll();
  };

  const openViewMessageModal = async (data: ResponseEvent) =>
    modals.open({
      onClose: hanldeClose,
      title: "Reply to request",
      size: "80%",
      children: <ViewMessages responseEvent={data} />,
    });

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="View Messages">
          <Button variant="light" color="cyan">
            View Messages
          </Button>
        </Tooltip>
      ),
      action: openViewMessageModal,
    },
  ];

  const FeedbackRowType = (rowData: any) => {
    const { type }: Feedback = JSON.parse(rowData);

    return (
      <Table.Td>
        {type === FeedbackType.Good ? (
          <Button
            variant="light"
            color="teal"
            leftSection={<MdOutlineThumbUp />}
          >
            {type}
          </Button>
        ) : (
          <Button
            variant="light"
            color="red"
            leftSection={<MdOutlineThumbDown />}
          >
            {type}
          </Button>
        )}
      </Table.Td>
    );
  };

  const cloumns: TableColumns[] = [
    {
      label: "User",
      dataColumn: FeedbackColumnEnum.user,
      maxWidth: 10,
    },
    {
      label: "State",
      dataColumn: FeedbackColumnEnum.state,
      maxWidth: 10,
    },
    {
      label: "Feedback Type",
      dataColumn: FeedbackColumnEnum.type,
      elementFun: FeedbackRowType,
    },
  ];

  return (
    <>
      <DataTable
        actions={actions}
        columns={cloumns}
        rows={rows}
        actionButtons={actionButtons}
      />
    </>
  );
}
