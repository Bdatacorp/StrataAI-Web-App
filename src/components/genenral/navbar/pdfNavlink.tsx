"use client";

import { togglePDFViewer } from "@/lib/provider/features/pdf/pdf.slice";
import { closeMobileNavBar } from "@/lib/provider/features/ui/ui.slice";
import { RootState } from "@/lib/provider/store";
import { ActionIcon } from "@mantine/core";
import { PiFilePdfFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function PDFNavlink() {
  const pdfViewerOpened = useSelector(
    (state: RootState) => state.pdf.isPDFViewerOpened
  );
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(closeMobileNavBar());
    dispatch(togglePDFViewer());
  };

  return (
    <PiFilePdfFill
      onClick={handleOnClick}
      className={`text-[30px] ${
        pdfViewerOpened ? "text-primary" : "text-white"
      } text-primary cursor-pointer`}
    />
  );
}
