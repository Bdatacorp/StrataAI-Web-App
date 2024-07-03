import { message, MessageRoles } from "@/components/modules/chat/types";
import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  messages: message[];
}

const initialState: initialState = {
  messages: [
    {
      text: "Hello, I am a Strata chat assistant here to help you with any questions you may have regarding the document you have uploaded.",
      role: MessageRoles.Assistant,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setAssistantMessege(state, action) {
      state.messages.push({
        text: action.payload,
        role: MessageRoles.Assistant,
      });
    },
    setUserMessege(state, action) {
      state.messages.push({ text: action.payload, role: MessageRoles.User });
    },
  },
});

export const { setAssistantMessege, setUserMessege } = chatSlice.actions;

export default chatSlice.reducer;
