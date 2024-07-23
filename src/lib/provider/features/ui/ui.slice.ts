import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  isMobileNavBarOpened: boolean;
  streamingResponse: boolean;
  newConversation: boolean;
}

const initialState: initialState = {
  isMobileNavBarOpened: false,
  streamingResponse: false,
  newConversation: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileNavBar(state) {
      state.isMobileNavBarOpened = !state.isMobileNavBarOpened;
    },
    closeMobileNavBar(state) {
      state.isMobileNavBarOpened = false;
    },
    toggleStreamingResponse(state) {
      state.streamingResponse = !state.streamingResponse;
    },
    toggleConversation(state) {
      state.newConversation = !state.newConversation;
    },
    closeConversation(state) {
      state.newConversation = false;
    },
  },
});

export const {
  toggleMobileNavBar,
  closeMobileNavBar,
  toggleStreamingResponse,
  toggleConversation,
  closeConversation,
} = uiSlice.actions;

export default uiSlice.reducer;
