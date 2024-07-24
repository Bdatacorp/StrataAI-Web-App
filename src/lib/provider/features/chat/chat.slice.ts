import { message, MessageRoles } from "@/components/modules/chat/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  messages: message[];
  activeSession: string;
}

const initialState: initialState = {
  messages: [
    {
      id: "0",
      text: "Hello, I am Strata Chat AI. How can I assist you today?",
      role: MessageRoles.Assistant,
    },
  ],
  activeSession: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAssistantMessage(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      state.messages.push({
        id: action.payload.id,
        text: action.payload.content,
        role: MessageRoles.Assistant,
      });
    },
    setAssistantMessageStream(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      const existing = state.messages.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        state.messages = state.messages.map((message) =>
          message.id === existing.id
            ? { ...message, text: existing.text + action.payload.content }
            : message
        );
      }
    },
    initiateNewMessageForStream(state, action: PayloadAction<{ id: string }>) {
      state.messages.push({
        id: action.payload.id,
        text: "",
        role: MessageRoles.Assistant,
      });
    },
    setUserMessage(
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) {
      state.messages.push({
        id: action.payload.id,
        text: action.payload.content,
        role: MessageRoles.User,
      });
    },
    loadPreMessages(state, action: PayloadAction<message[]>) {
      state.messages = action.payload;
    },
    setActiveSession(state, action: PayloadAction<string>) {
      localStorage.setItem("session_id", action.payload);
      state.activeSession = action.payload;
    },
  },
});

export const {
  setAssistantMessage,
  setUserMessage,
  loadPreMessages,
  setAssistantMessageStream,
  initiateNewMessageForStream,
  setActiveSession,
} = chatSlice.actions;

export default chatSlice.reducer;
