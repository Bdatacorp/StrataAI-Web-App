import { Message } from "@/server/app/chat/chat.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  isMobileNavBarOpened: boolean;
  streamingResponse: boolean;
  newConversation: boolean;
  newSession: boolean;
  slideBarExpanded: boolean;
  isCreateSystemUserModelOpened: boolean;
}

const initialState: initialState = {
  isMobileNavBarOpened: false,
  isCreateSystemUserModelOpened: false,
  streamingResponse: true,
  newConversation: false,
  newSession: false,
  slideBarExpanded: true,
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
    openConversation(state) {
      state.newConversation = true;
    },
    updateSideBar: (state) => {
      state.slideBarExpanded = !state.slideBarExpanded;
    },
    setNewSession: (state, action: PayloadAction<boolean>) => {
      state.newSession = action.payload;
    },

    openCreateSystemUserModel(state) {
      state.isCreateSystemUserModelOpened = true;
    },
    closeCreateSystemUserModel(state) {
      state.isCreateSystemUserModelOpened = false;
    },
  },
});

export const {
  toggleMobileNavBar,
  closeMobileNavBar,
  toggleStreamingResponse,
  toggleConversation,
  closeConversation,
  openConversation,
  updateSideBar,
  setNewSession,
  openCreateSystemUserModel,
  closeCreateSystemUserModel,
} = uiSlice.actions;

export default uiSlice.reducer;
