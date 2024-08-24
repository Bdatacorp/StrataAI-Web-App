"use client";

import { Colors } from "@/lib/config/colors";
import createResponseEventAction from "@/server/actions/response-event/createResponseEventAction";
import replyToResponseEventAction from "@/server/actions/response-event/replyToResponseEventAction";
import {
  ResponseEvent,
  ResponseEventType,
} from "@/server/app/response-event/response-event.types";
import { User } from "@/server/app/users/users.types";
import { Button, LoadingOverlay, Textarea, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";

export default function ReplyManagerRequestModal({
  responseEvent,
  onClose,
}: {
  responseEvent: ResponseEvent;
  onClose: () => void;
}) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [messageError, setMessageError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const hanldeConfirm = async () => {
    setLoading(true);

    const res = await replyToResponseEventAction({
      requestId: responseEvent._id,
      message: messageRef.current?.value as string,
    });

    if ("zodErrors" in res) {
      setMessageError(res.zodErrors.message.message);
    } else {
      if ("status" in res && res.status == true) {
        toast.success(res.payload.message);
        onClose();
      } else {
        toast.error("Something Went Wrong");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-3 relative">
        <LoadingOverlay
          visible={loading}
          loaderProps={{ color: Colors.primary }}
        />

        {responseEvent.type === ResponseEventType.Message &&
          responseEvent.content && (
            <>
              <div className="flex flex-col gap-2 shadow p-2 rounded-md">
                <div className="flex h-auto gap-2">
                  <div className="flex justify-center items-center">
                    <FaUserCircle className="text-2xl" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs">
                      {responseEvent.session.user.email}
                    </div>
                    <div className="text-[10px]">{responseEvent.updatedAt}</div>
                  </div>
                </div>
                <p className="text-sm">{responseEvent.content}</p>
              </div>
            </>
          )}

        <Textarea
          error={messageError}
          label="Message"
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
      </div>
    </>
  );
}
