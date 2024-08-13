"use client";

import { Colors } from "@/lib/config/colors";
import createResponseEvent from "@/server/actions/feedback copy/createResponseEvent";
import { ResponseEventType } from "@/server/app/chat/chat.types";
import { Button, Textarea, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ContactMangerModal({
  messageId,
  onClose,
}: {
  messageId: string;
  onClose: () => void;
}) {
  const [verifyResponseClicked, setVerifyResponseClicked] =
    useState<boolean>(false);
  const [customMessageClicked, setCustomMessageClicked] =
    useState<boolean>(false);
  const [type, setType] = useState<ResponseEventType>();

  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleVerifyResponse = async () => {
    resetState();
    setVerifyResponseClicked(true);
    setType(ResponseEventType.Verify);
  };

  const handleCustomMessage = () => {
    resetState();
    setCustomMessageClicked(true);
    setType(ResponseEventType.Message);
  };

  const hanldeConfirm = async () => {
    onClose();

    const res = await createResponseEvent({
      messageId,
      payload: {
        type:
          type === ResponseEventType.Message
            ? (type as ResponseEventType.Message)
            : (type as ResponseEventType.Verify),
        content: messageRef.current?.value || "",
      },
    });

    if ("status" in res) {
      res.status &&
        toast.success("You will receive an email with feedback shortly.");
    }
  };

  const resetState = () => {
    setVerifyResponseClicked(false);
    setCustomMessageClicked(false);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-3">
        <Tooltip
          label="Verify the response to confirm its accuracy"
          color="gray"
        >
          <Button
            color={Colors.primary}
            variant={verifyResponseClicked ? "filled" : "outline"}
            onClick={handleVerifyResponse}
          >
            Verify Response
          </Button>
        </Tooltip>

        <Tooltip
          label="Directly ask your question from the manager"
          color="gray"
        >
          <Button
            color={Colors.primary}
            variant={customMessageClicked ? "filled" : "outline"}
            onClick={handleCustomMessage}
          >
            Ask Manager
          </Button>
        </Tooltip>

        {customMessageClicked && (
          <div>
            <Textarea
              label="Message"
              ref={messageRef}
              description="If you're unsatisfied with the Strata AI's response or need more information, use this option to directly ask the manager your question."
              rows={5}
              maxRows={10}
            />
          </div>
        )}

        <div className="mt-4 w-full flex justify-end gap-4">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={hanldeConfirm}
            variant="filled"
            color={Colors.primary}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}
