"use client";

import PDFViewer from "@/components/ui/client/webViewer/pdfViewer";
import { clearAnnotationPDF } from "@/lib/provider/features/pdf/pdf.slice";
import { RootState } from "@/lib/provider/store";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";

export default function ChatClientPDF() {
  const annotationPDF = useSelector(
    (state: RootState) => state.pdf.annotationPDF
  );
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        size="xl"
        opened={annotationPDF.opened}
        onClose={() => dispatch(clearAnnotationPDF())}
      >
        <div className="h-[80svh]">
          {annotationPDF.url && (
            <PDFViewer
              initialDoc={annotationPDF.url}
              licenseKey={process.env.NEXT_PUBLIC_PDF_EXPRESS_KEY as string}
              page={annotationPDF.page as number}
            />
          )}
        </div>
      </Modal>
    </>
  );
}
