"use client";

import ReplyManagerRequestModal from "@/components/modules/admin/response-event/client/replyManagerRequest/replyManagerRequestModal";
import ReplyViewManagerRequestModal from "@/components/modules/admin/response-event/client/replyManagerRequest/replyViewManagerRequestModal copy";
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
import { FeedbackType } from "@/server/app/feedback/feedback.types";
import {
  Feedback,
  FeedbackColumnEnum,
} from "@/server/app/feedback/feedback.types";
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

  const handleViewMessages = async (data: ResponseEvent) => {
    dispatch(
      setViewMessages({
        userMessage: data.userMessage,
        assistantMessage: data.assistantMessage,
      })
    );
  };

  const hanldeClose = () => {
    modals.closeAll();
  };

  const openReplyModal = async (data: ResponseEvent) =>
    modals.open({
      onClose: hanldeClose,
      title: "Reply to request",
      size: "lg",
      children: (
        <ReplyManagerRequestModal onClose={hanldeClose} responseEvent={data} />
      ),
    });

  const openReplyViewModal = async (data: ResponseEvent) =>
    modals.open({
      onClose: hanldeClose,
      title: "View Reply",
      size: "lg",
      children: (
        <ReplyViewManagerRequestModal
          onClose={hanldeClose}
          responseEvent={data}
        />
      ),
    });

  const actionButtons: RowActionButton[] = [
    {
      element: (
        <Tooltip color="gray" label="View Request Messages">
          <Button variant="light" color="cyan">
            View Messages
          </Button>
        </Tooltip>
      ),
      action: handleViewMessages,
    },
  ];

  const EventRowType = (responseEvent: ResponseEvent) => {
    const { type, content, reply } = responseEvent;
    return (
      <Table.Td>
        {type === ResponseEventType.Message && (
          <Button variant="light" color="blue" leftSection={<MdMessage />}>
            {type}
          </Button>
        )}
        {type === ResponseEventType.Verify && (
          <Button variant="light" color="grape" leftSection={<MdVerified />}>
            {type}
          </Button>
        )}
      </Table.Td>
    );
  };

  const EventRowReply = (responseEvent: ResponseEvent) => {
    const { type, content, reply } = responseEvent;
    return (
      <Table.Td>
        {reply ? (
          <Tooltip color="gray" label="Reply to user">
            <Button
              onClick={() => openReplyViewModal(responseEvent)}
              variant="light"
              color="teal"
              leftSection={<FaCheck />}
            >
              Replied
            </Button>
          </Tooltip>
        ) : (
          <>
            {type === ResponseEventType.Verify && (
              <Tooltip color="gray" label="Reply to user">
                <Button
                  onClick={() => openReplyModal(responseEvent)}
                  variant="light"
                  color="yellow"
                  leftSection={<MdSend />}
                >
                  Reply
                </Button>
              </Tooltip>
            )}

            {type === ResponseEventType.Message && (
              <Tooltip color="gray" label="Reply to user">
                <Button
                  onClick={() => openReplyModal(responseEvent)}
                  variant="light"
                  color="yellow"
                  leftSection={<MdSend />}
                >
                  Reply
                </Button>
              </Tooltip>
            )}
          </>
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
