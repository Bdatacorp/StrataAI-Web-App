import { Colors } from "@/lib/config/colors";
import { Button, Textarea, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

export default function ContactMangerModal({
  onClose,
}: {
    onClose: () => void;
}) {
  const [verifyResponseClicked, setVerifyResponseClicked] =
    useState<boolean>(false);
  const [customMessageClicked, setCustomMessageClicked] =
    useState<boolean>(false);

  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleVerifyResponse = () => {
    resetState();
    setVerifyResponseClicked(true);
  };

  const handleCustomMessage = () => {
    resetState();
    setCustomMessageClicked(true);
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
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button variant="filled" color={Colors.primary}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}
