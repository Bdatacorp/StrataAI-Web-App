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
import { MessageMetadata } from "@/server/app/chat/chat.types";

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

    try {
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
        let metadata: MessageMetadata[] = [];
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // revalidateSessionAction();

            setClientMessages((prevMessages) => {
              const existingMessage = prevMessages.find(
                (message) => message.id === id
              );

              if (existingMessage) {
                return prevMessages.map((message) =>
                  message.id === id
                    ? { ...message, metadata: metadata }
                    : message
                );
              } else {
                return prevMessages;
              }
            });

            setLoading(false);
            break;
          }

          try {
            if (value.includes("metadata")) {
              const data = await JSON.parse(value);
              metadata = data.metadata;
            } else {
              setClientMessages((prevMessages) => {
                const existingMessage = prevMessages.find(
                  (message) => message.id === id
                );

                if (existingMessage) {
                  return prevMessages.map((message) =>
                    message.id === id
                      ? { ...message, text: message.text + value.toString() }
                      : message
                  );
                } else {
                  return [
                    ...prevMessages,
                    {
                      id,
                      role: MessageRoles.Assistant,
                      text: value.toString(),
                    },
                  ];
                }
              });
            }
          } catch (err) {
            console.log(err);
            throw err;
          }
        }
      } else {
        setLoading(false);
        setMessageInputError("Error");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
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
