import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/ui.slice";
import pdfSlice from "./features/pdf/pdf.slice";
import chatSlice from "./features/chat/chat.slice";
import stateSlice from "./features/state/state.slice";
import fileSclice from "./features/file/file.slice";
import userSlice from "./features/user/user.slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    pdf: pdfSlice,
    chat: chatSlice,
    state: stateSlice,
    file: fileSclice,
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
