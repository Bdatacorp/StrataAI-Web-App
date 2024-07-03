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
  setAssistantMessege,
  setUserMessege,
} from "@/lib/provider/features/chat/chat.slice";

const initialState: ChatFormState = {
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
    if (state.content) {
      dispatch(setAssistantMessege(state.content));
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [state]);

  const handleFormSubmit = (formData: FormData) => {
    formAction(formData);
    const data = formData.get("text");
    if (data) {
      dispatch(setUserMessege(data));
    }
  };

  return (
    <ControlledForm action={handleFormSubmit}>
      <div className="flex justify-center items-center gap-3 px-8 lg:px-20">
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
