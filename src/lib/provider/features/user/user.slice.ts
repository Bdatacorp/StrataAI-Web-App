import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInitialState {
  isNewUser: boolean;
}

const initialState: UserInitialState = {
  isNewUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload;
    },
  },
});

export const { setIsNewUser } = userSlice.actions;

export default userSlice.reducer;
