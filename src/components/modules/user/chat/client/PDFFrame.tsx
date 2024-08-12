"use client";

import PDFViewer from "@/components/ui/client/webViewer/pdfViewer";
import { closePDFViewer } from "@/lib/provider/features/pdf/pdf.slice";
import { RootState } from "@/lib/provider/store";
import { Button, Modal } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PDFObject from "pdfobject";

export default function PDFFrame() {
  const pdfViewerOpened = useSelector(
    (state: RootState) => state.pdf.isPDFViewerOpened
  );
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [pdfViewerOpened]);

  const handlePdfLoad = () => {
    PDFObject.embed(
      "http://localhost:3001/file/view/ddd#toolbar=0",
      "#pdfRenderer",
      {
        pdfOpenParams: {
          view: "FitH",
        },
      }
    );
  };

  return (
    <>
      <Modal
        size="xl"
        opened={pdfViewerOpened}
        onClose={() => dispatch(closePDFViewer())}
      >
        <Button onClick={handlePdfLoad}>Clickme</Button>
        <div id="pdfRenderer" className="w-full"></div>
      </Modal>
    </>
  );
}
