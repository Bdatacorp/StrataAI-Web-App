import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  isMobileNavBarOpened: boolean;
  streamingResponse: boolean;
}

const initialState: initialState = {
  isMobileNavBarOpened: false,
  streamingResponse: false,
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
  },
});

export const {
  toggleMobileNavBar,
  closeMobileNavBar,
  toggleStreamingResponse,
} = uiSlice.actions;

export default uiSlice.reducer;
