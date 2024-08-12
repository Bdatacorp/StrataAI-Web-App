import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  annotationPDF: {
    opened: boolean;
    url?: string;
    page?: number;
  };
}

const initialState: initialState = {
  annotationPDF: {
    opened: false,
  },
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setAnnotationPDF(
      state,
      action: PayloadAction<{ url: string; page: number }>
    ) {
      state.annotationPDF.opened = true;
      state.annotationPDF.url = action.payload.url;
      state.annotationPDF.page = action.payload.page;
    },
    clearAnnotationPDF(state) {
      state.annotationPDF.opened = false;
      state.annotationPDF.url = "";
    },
  },
});

export const { setAnnotationPDF, clearAnnotationPDF } = pdfSlice.actions;
export default pdfSlice.reducer;
