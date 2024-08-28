"use client";

import ReplyManagerRequestModal from "@/components/modules/admin/response-event/client/managerRequest/replyManagerRequestModal";
import DataTable from "@/components/ui/client/table/dataTable";
import {
  RowActionButton,
  TableActionIconsProps,
  TableColumns,
  TableRows,
  TableRowsActionTypes,
} from "@/components/ui/client/table/types";
import {
  ResponseEvent,
  ResponseEventColumnEnum,
  ResponseEventType,
} from "@/server/app/response-event/response-event.types";
import { Button, Table, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import {
  MdMessage,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdQuestionAnswer,
  MdReplay,
  MdSend,
  MdVerified,
} from "react-icons/md";
import { useDispatch } from "react-redux";

export default function ResponseEventClientTable({
  rows,
}: {
  rows: TableRows;
}) {
  const dispatch = useDispatch();
  const actions: TableActionIconsProps = {};

  const hanldeClose = () => {
    modals.closeAll();
  };

  const openReplyModal = async (data: ResponseEvent) =>
    modals.open({
      onClose: hanldeClose,
      title: "Reply to request",
      fullScreen: true,
      children: (
        <ReplyManagerRequestModal onClose={hanldeClose} responseEvent={data} />
      ),
    });

  const actionButtons: RowActionButton[] = [];

  const EventRowType = (rowData: any) => {
    const { type, content, reply }: ResponseEvent = JSON.parse(rowData);
    return (
      <Table.Td>
        {type === ResponseEventType.Message && (
          <Button
            className="cursor-default"
            variant="light"
            color="blue"
            leftSection={<MdMessage />}
          >
            {type}
          </Button>
        )}
        {type === ResponseEventType.Verify && (
          <Button
            className="cursor-default"
            variant="light"
            color="grape"
            leftSection={<MdVerified />}
          >
            {type}
          </Button>
        )}
      </Table.Td>
    );
  };

  const EventRowReply = (rowData: any) => {
    const { type, content, reply }: ResponseEvent = JSON.parse(rowData);
    return (
      <Table.Td>
        {reply ? (
          <Tooltip color="gray" label="Reply to user">
            <Button
              onClick={() => openReplyModal(JSON.parse(rowData))}
              variant="light"
              color="teal"
              leftSection={<FaCheck />}
            >
              Replied
            </Button>
          </Tooltip>
        ) : (
          <Tooltip color="gray" label="Reply to user">
            <Button
              onClick={() => openReplyModal(JSON.parse(rowData))}
              variant="light"
              color="yellow"
              leftSection={<MdSend />}
            >
              Reply
            </Button>
          </Tooltip>
        )}
      </Table.Td>
    );
  };

  const cloumns: TableColumns[] = [
    {
      label: "User",
      dataColumn: ResponseEventColumnEnum.user,
      maxWidth: 10,
    },
    {
      label: "State",
      dataColumn: ResponseEventColumnEnum.state,
      maxWidth: 10,
    },
    {
      label: "Created at",
      dataColumn: ResponseEventColumnEnum.updatedAt,
      maxWidth: 10,
    },
    {
      label: "Event Type",
      dataColumn: ResponseEventColumnEnum.payload,
      elementFun: EventRowType,
    },
    {
      label: "Reply",
      dataColumn: ResponseEventColumnEnum.payload,
      elementFun: EventRowReply,
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
