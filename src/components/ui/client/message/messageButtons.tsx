"use client";

import { ClientMessage } from "@/components/modules/user/chat/types";
import React, { useEffect, useState } from "react";
import CopyButtonElement from "../buttons/copyButton/copyButton";
import { ActionIcon, Button, Text, Tooltip } from "@mantine/core";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import ResponseFeedbackRadio from "../buttons/responseFeeadback/responseFeedbackRadio";
import { modals } from "@mantine/modals";
import { Colors } from "@/lib/config/colors";
import ContactMangerModal from "./contactMangerModal";

export default function MessageButtons({
  message,
}: {
  message: ClientMessage;
}) {
  const hanldeClose = () => {
    modals.closeAll();
  };

  const openContactManager = () =>
    modals.open({
      onClose: hanldeClose,
      title: "Please confirm your action",
      children: (
        <ContactMangerModal onClose={hanldeClose} messageId={message.id} />
      ),
    });

  return (
    <div className="w-full flex gap-3 items-center">
      <CopyButtonElement value={message.text} />

      <Tooltip label="Contact Manager" position="bottom" color="gray">
        <ActionIcon
          variant="transparent"
          color="gray"
          className="hover:bg-gray-100"
          onClick={openContactManager}
        >
          <MdOutlineEmail />
        </ActionIcon>
      </Tooltip>

      <ResponseFeedbackRadio messageId={message.id} />
    </div>
  );
}
