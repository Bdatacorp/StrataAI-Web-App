"use client";

import PDFViewer from "@/components/ui/webViewer/pdfViewer";
import { RootState } from "@/lib/provider/store";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChatClientPDF() {
  const pdfViewerOpened = useSelector(
    (state: RootState) => state.pdf.isPDFViewerOpened
  );

  return (
    <>
      {pdfViewerOpened && (
        <PDFViewer
          initialDoc="/files/doc.pdf"
          licenseKey={process.env.NEXT_PUBLIC_PDF_EXPRESS_KEY || ""}
        />
      )}
    </>
  );
}
