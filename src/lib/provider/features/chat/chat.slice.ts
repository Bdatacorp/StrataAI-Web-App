import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  activeSession: string;
}

const initialState: initialState = {
  activeSession: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveSession(state, action: PayloadAction<string>) {
      localStorage.setItem("session_id", action.payload);
      state.activeSession = action.payload;
    },
  },
});

export const { setActiveSession } = chatSlice.actions;

export default chatSlice.reducer;
