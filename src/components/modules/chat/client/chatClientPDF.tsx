"use client";

import PDFViewer from "@/components/ui/client/webViewer/pdfViewer";
import { closePDFViewer } from "@/lib/provider/features/pdf/pdf.slice";
import { RootState } from "@/lib/provider/store";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

export default function ChatClientPDF() {
  const pdfViewerOpened = useSelector(
    (state: RootState) => state.pdf.isPDFViewerOpened
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      dispatch(closePDFViewer());
    }
  }, [dispatch]);

  return (
    <>
      {pdfViewerOpened && (
        <div className="hidden lg:block w-full lg:w-[40%]">
          {/* <PDFViewer
            initialDoc="/files/doc.pdf"
            licenseKey={process.env.NEXT_PUBLIC_PDF_EXPRESS_KEY || ""}
          /> */}
        </div>
      )}

      <Modal
        size="xl"
        opened={pdfViewerOpened}
        onClose={() => dispatch(closePDFViewer())}
        className="lg:hidden"
      >
        <div className="h-[80vh]">
          {pdfViewerOpened && (
            <PDFViewer
              initialDoc="/files/doc.pdf"
              licenseKey={process.env.NEXT_PUBLIC_PDF_EXPRESS_KEY || ""}
            />
          )}
        </div>
      </Modal>
    </>
  );
}
