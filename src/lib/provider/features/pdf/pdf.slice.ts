import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  isPDFViewerOpened: boolean;
}

const initialState = {
  isPDFViewerOpened: true,
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    togglePDFViewer(state) {
      state.isPDFViewerOpened = !state.isPDFViewerOpened;
    },
    openPDFViewer(state) {
      state.isPDFViewerOpened = true;
    },
    closePDFViewer(state) {
      state.isPDFViewerOpened = false;
    },
  },
});

export const { togglePDFViewer, openPDFViewer, closePDFViewer } =
  pdfSlice.actions;
export default pdfSlice.reducer;
