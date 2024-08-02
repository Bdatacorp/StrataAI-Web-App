import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateInitialState {
  uploadFileModalOpened: boolean;
}

const initialState: StateInitialState = {
  uploadFileModalOpened: false,
};

const fileSclice = createSlice({
  name: "state",
  initialState,
  reducers: {
    openUploadFileModal(state) {
      state.uploadFileModalOpened = true;
    },
    closeUploadFileModal(state) {
      state.uploadFileModalOpened = false;
    },
  },
});

export const { openUploadFileModal, closeUploadFileModal } = fileSclice.actions;

export default fileSclice.reducer;
