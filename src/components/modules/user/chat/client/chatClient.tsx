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

export default function ChatClient({
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
    }
    setMessageInputError("");
    setLoading(true);
    const res = await askQuestionAction(text || "");
    setLoading(false);
    if (res.zodErrors) {
      setMessageInputError(res.zodErrors.text.message);
    } else {
      if (res?.status) {
        const message: ClientMessage = {
          id: res?.payload?.data?.assistant?.id,
          role: MessageRoles.Assistant,
          text: res?.payload?.data?.assistant?.message,
        };
        setClientMessages((prevMessages) => [...prevMessages, message]);
      }
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
