"use client";

import ChatMessages from "./chatMesseges";

import NewConversation from "./newConversation/newConversation";

import GetStarted from "../../getStarted/getStarted";
import ChatFooter from "../server/chatFooter";
import { useEffect, useState } from "react";
import { ClientMessage, MessageRoles } from "../types";
import { toast } from "react-toastify";
import askQuestionAction from "@/server/actions/chat/askQuestionAction";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";
import NewSession from "../../session/client/newSessionClient";
import askQuestionActionStream from "@/server/actions/chat/revalidateSessionAction";
import { HttpMethod } from "@/utils/server/http/type";
import { Modules } from "@/lib/config/modules";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import ChatRoute from "@/server/app/chat/chat.routes";
import revalidateSessionAction from "@/server/actions/chat/revalidateSessionAction";

export default function ChatClientStream({
  messages,
  states,
}: {
  states: { value: string; label: string }[];
  messages: ClientMessage[];
}) {
  const [clientMessages, setClientMessages] =
    useState<ClientMessage[]>(messages);
  const [messageInputError, setMessageInputError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (text: string | undefined) => {
    if (text) {
      setClientMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          role: MessageRoles.User,
          text: text as string,
        },
      ]);
    } else {
      return setMessageInputError("Please enter the question");
    }
    setMessageInputError("");
    setLoading(true);

    const token = await getSession();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${ChatRoute.STREAM_MESSAGE}/${token?.user.sessionToken}`,
      {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.user.token}`,
        },
        body: JSON.stringify({
          text,
        }),
      }
    );

    if (response.ok && response.body) {
      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      const id = Date.now().toString();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          revalidateSessionAction();
          setLoading(false);
          break;
        }
        setClientMessages((prevMessages) => {
          const existingMessage = prevMessages.find(
            (message) => message.id === id
          );

          if (existingMessage) {
            console.log("existingMessage", existingMessage);

            return prevMessages.map((message) =>
              message.id === id
                ? { ...message, text: message.text + value }
                : message
            );
          } else {
            return [
              ...prevMessages,
              {
                id,
                role: MessageRoles.Assistant,
                text: value,
              },
            ];
          }
        });
      }
    } else {
      setLoading(false);
      setMessageInputError("Error");
    }
  };

  return (
    <>
      <NewConversation statesData={states} />
      <ChatMessages messages={clientMessages} />
      <ChatFooter
        messageInputError={messageInputError}
        handleSend={handleSend}
        loading={loading}
      />
    </>
  );
}
