import { Colors } from "@/lib/config/colors";
import { Button, Textarea } from "@mantine/core";
import React from "react";
import { MdSend } from "react-icons/md";

export default function ReplyElement({
  messageError,
  messageRef,
  onClose,
  hanldeConfirm,

}: {
  messageError: string;
  messageRef: React.RefObject<HTMLTextAreaElement>;
  onClose: () => void;
  hanldeConfirm: () => Promise<void>;

}) {
  return (
    <>
      <Textarea
        error={messageError}
        label="Comment"
        description="Reply message"
        placeholder="Type your comment here"
        ref={messageRef}
        autosize
        minRows={7}
      />

      <div className="mt-4 w-full flex justify-end gap-4">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={hanldeConfirm}
          variant="filled"
          color={Colors.primary}
          rightSection={<MdSend />}
        >
          Send
        </Button>
      </div>
    </>
  );
}
