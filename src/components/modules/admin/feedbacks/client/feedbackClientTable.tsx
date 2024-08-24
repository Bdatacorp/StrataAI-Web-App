"use client";

import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import { Modules } from "@/lib/config/modules";
import { openUploadFileToStateModal } from "@/lib/provider/features/state/state.slice";
import { setViewMessages } from "@/lib/provider/features/ui/ui.slice";
import deleteStateAction from "@/server/actions/state/deleteStateAction";
import { FeedbackType } from "@/server/app/chat/chat.types";
import {
  Feedback,
  FeedbackColumnEnum,
} from "@/server/app/feedback/feedback.types";
import { Button, Table, Tooltip } from "@mantine/core";
import React from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function FeedbackClientTable({ rows }: { rows: TableRows }) {
  const dispatch = useDispatch();
  const actions: TableActionIconsProps = {};

  const handleViewMessages = async (data: Feedback) => {
    dispatch(
      setViewMessages({
        userMessage: data.userMessage,
        assistantMessage: data.assistantMessage,
      })
    );
  };

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="View Messages">
          <Button variant="light" color="cyan">
            View Messages
          </Button>
        </Tooltip>
      ),
      action: handleViewMessages,
    },
  ];

  const FeedbackRowType = (type: Feedback["type"]) => {
    return (
      <Table.Td className="w-28">
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
      label: "Created at",
      dataColumn: FeedbackColumnEnum.createdAt,
      maxWidth: 20,
    },
    {
      label: "State",
      dataColumn: FeedbackColumnEnum.session,
      maxWidth: 20,
    },
    {
      label: "type",
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
