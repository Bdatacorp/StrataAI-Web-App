import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateInitialState {
  isCreateStateModelOpened: boolean;
  uploadFileToStateModal: { opened: boolean; id?: string };
}

const initialState: StateInitialState = {
  isCreateStateModelOpened: false,
  uploadFileToStateModal: { opened: false },
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    openCreateStateModel(state) {
      state.isCreateStateModelOpened = true;
    },
    closeCreateStateModel(state) {
      state.isCreateStateModelOpened = false;
    },
    openUploadFileToStateModal(state, action: PayloadAction<string>) {
      state.uploadFileToStateModal.opened = true;
      state.uploadFileToStateModal.id = action.payload;
    },
    closeUploadFileToStateModal(state) {
      state.uploadFileToStateModal.opened = false;
      state.uploadFileToStateModal.id = "";
    },
  },
});

export const {
  openCreateStateModel,
  closeCreateStateModel,
  openUploadFileToStateModal,
  closeUploadFileToStateModal,
} = stateSlice.actions;

export default stateSlice.reducer;
