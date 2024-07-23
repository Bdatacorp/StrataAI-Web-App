"use client";
import ControlledForm from "@/components/ui/client/controlledForm/form";
import sendAction from "@/server/actions/chat/sendAction";
import { ActionIcon, Input, TextInput } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { MdClear, MdSend } from "react-icons/md";
import { SiCcleaner } from "react-icons/si";
import { ChatFormState } from "../types";
import { error } from "console";
import { useDispatch } from "react-redux";
import {
  loadPreMessages,
  setAssistantMessage,
  setUserMessage,
} from "@/lib/provider/features/chat/chat.slice";
import loadChatMessages from "@/server/actions/chat/loadMessages";
import userSession from "@/utils/generators/userSession";

const initialState: ChatFormState = {
  id: "",
  content: "",
  status: false,
  errors: {
    text: { message: "" },
  },
};

export default function ChatClientForm() {
  const [state, formAction] = useFormState(sendAction, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    loadSessionMessages(userSession());
    if (state.content) {
      dispatch(setAssistantMessage({ id: state.id, content: state.content }));
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [state]);

  async function loadSessionMessages(token: string) {
    const messages = await loadChatMessages(token);
    if (messages.status) {
      dispatch(loadPreMessages(messages.payload));
    }
  }

  const handleFormSubmit = (formData: FormData) => {
    formData.set("token", userSession());
    formAction(formData);
    const data = formData.get("text") as string;
    if (data) {
      dispatch(setUserMessage({ id: state.id, content: data }));
    }
  };

  return (
    <ControlledForm action={handleFormSubmit}>
      <div className="flex justify-center items-center gap-3 px-4 lg:px-20">
        <div>
          <ActionIcon size="lg" c="white" className="bg-secondary" radius={100}>
            <SiCcleaner className="text-lg" />
          </ActionIcon>
        </div>
        <div className="grow">
          <Input
            name="text"
            ref={inputRef}
            error={state?.errors?.text?.message}
            radius="xl"
            placeholder="Ask Anything"
          />
        </div>
        <div>
          <ActionIcon
            type="submit"
            size="lg"
            c="white"
            className="bg-primary"
            radius={100}
          >
            <MdSend className="text-lg" />
          </ActionIcon>
        </div>
      </div>
    </ControlledForm>
  );
}
