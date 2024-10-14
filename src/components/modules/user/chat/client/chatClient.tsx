"use client";

import ChatMessages from "./chatMesseges";

import NewConversation from "./newConversation/newConversation";

import GetStarted from "../../getStarted/getStarted";
import ChatFooter from "../server/chatFooter";
import { useEffect, useState } from "react";
import { ClientMessage, MessageRoles } from "../types";
import { toast } from "react-toastify";
import askQuestionAction from "@/server/actions/chat/askQuestionAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/provider/store";
import NewSession from "../../session/client/newSessionClient";
import extractSourceNumber, {
  extractSource,
} from "@/utils/client/helper/extractSourceNumber";
import { useSearchParams } from "next/navigation";
import { setNewSession } from "@/lib/provider/features/ui/ui.slice";
import NewSessionClient from "../../session/client/newSessionClient";

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

  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("session") === "new") {
      dispatch(setNewSession(true));
    }
  }, [searchParams, dispatch]);

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
    if ("zodErrors" in res) {
      setMessageInputError(res.zodErrors.text.message);
    } else if ("payload" in res) {
      if (res?.status) {
        const assistant = res.payload.data?.assistant;
        const message: ClientMessage = {
          id: assistant.id,
          role: MessageRoles.Assistant,
          text: assistant.message,
          metadata: assistant.metadata,
        };
        setClientMessages((prevMessages) => [...prevMessages, message]);
      }
    }
  };

  return (
    <>
      <NewConversation statesData={states} />
      <NewSessionClient statesData={states} />
      <ChatMessages messages={clientMessages} />
      <ChatFooter
        messageInputError={messageInputError}
        setMessageInputError={setMessageInputError}
        handleSend={handleSend}
        loading={loading}
      />
    </>
  );
}
