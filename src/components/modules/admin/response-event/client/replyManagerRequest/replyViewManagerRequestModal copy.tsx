"use client";
import {
  ResponseEvent,
  ResponseEventType,
} from "@/server/app/response-event/response-event.types";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ReplyViewManagerRequestModal({
  responseEvent,
  onClose,
}: {
  responseEvent: ResponseEvent;
  onClose: () => void;
}) {
  return (
    <>
      <div className="w-full flex flex-col gap-3 relative">
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

        {responseEvent.reply && (
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
        )}
      </div>
    </>
  );
}
