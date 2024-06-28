import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
  isMobileNavBarOpened: boolean;
}

const initialState: initialState = {
  isMobileNavBarOpened: false,
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
  },
});

export const { toggleMobileNavBar, closeMobileNavBar } = uiSlice.actions;

export default uiSlice.reducer;
