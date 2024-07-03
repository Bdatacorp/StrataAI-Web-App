import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/ui/ui.slice";
import pdfSlice from "./features/pdf/pdf.slice";
import chatSlice from "./features/chat/chat.slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    pdf: pdfSlice,
    chat: chatSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
