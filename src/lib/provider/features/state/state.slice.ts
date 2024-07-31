import { createSlice } from "@reduxjs/toolkit";

export interface StateInitialState {
  isCreateStateModelOpened: boolean;
}

const initialState: StateInitialState = {
  isCreateStateModelOpened: false,
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
  },
});

export const { openCreateStateModel, closeCreateStateModel } =
  stateSlice.actions;

export default stateSlice.reducer;
