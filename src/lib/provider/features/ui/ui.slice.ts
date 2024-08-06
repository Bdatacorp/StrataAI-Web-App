import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  isMobileNavBarOpened: boolean;
  streamingResponse: boolean;
  newConversation: boolean;
  slideBarExpanded:boolean;
}

const initialState: initialState = {
  isMobileNavBarOpened: false,
  streamingResponse: false,
  newConversation: false,
  slideBarExpanded:true,
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
  },
});

export const {
  toggleMobileNavBar,
  closeMobileNavBar,
  toggleStreamingResponse,
  toggleConversation,
  closeConversation,
  openConversation,
  updateSideBar
} = uiSlice.actions;

export default uiSlice.reducer;
