"use client";

import ViewMessages from "@/components/ui/client/viewMessages/viewMessages";
import { Colors } from "@/lib/config/colors";
import replyToResponseEventAction from "@/server/actions/response-event/replyToResponseEventAction";
import {
  ResponseEvent,
  ResponseEventType,
} from "@/server/app/response-event/response-event.types";
import { User } from "@/server/app/users/users.types";
import {
  Button,
  Checkbox,
  Divider,
  LoadingOverlay,
  Textarea,
  Tooltip,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdSend, MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import ReplyElement from "./reply";
import verifyResponseEventAction from "@/server/actions/response-event/verifyResponseEventAction";
import { FaCheck } from "react-icons/fa6";

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
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const hanldeConfirm = async () => {
    setLoading(true);

    const res = await replyToResponseEventAction({
      requestId: responseEvent._id,
      verified: verified,
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
      <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-5 lg:gap-4">
        <ViewMessages responseEvent={responseEvent} />

        <div className="w-full flex flex-col gap-3 relative">
          <LoadingOverlay
            visible={loading}
            loaderProps={{ color: Colors.primary }}
          />

          <div>
            <strong>Manager Request Message</strong>
          </div>

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
                      <div className="text-[10px]">
                        {responseEvent.updatedAt}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{responseEvent.content}</p>
                </div>
              </>
            )}

          {responseEvent.reply ? (
            <>
              <div className="flex flex-col gap-2 shadow p-2 rounded-md">
                <div className="flex h-auto gap-2">
                  <div className="flex justify-center items-center">
                    <FaUserCircle className="text-2xl" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs">Manager</div>
                    <div className="text-[10px]">
                      {responseEvent.reply.updatedAt}
                    </div>
                  </div>
                </div>
                <p className="text-sm">{responseEvent.reply.content}</p>
              </div>
            </>
          ) : (
            <>
              {responseEvent.type === ResponseEventType.Verify && (
                <>
                  <div>
                    <Checkbox
                      className="cursor-pointer"
                      color="teal"
                      label={<>Verify The Response</>}
                      checked={verified}
                      onChange={() => setVerified(!verified)}
                    />
                  </div>
                </>
              )}

              <ReplyElement
                messageError={messageError}
                messageRef={messageRef}
                onClose={onClose}
                hanldeConfirm={hanldeConfirm}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
