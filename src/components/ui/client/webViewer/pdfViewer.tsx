"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import WebViewerInstance from "@pdftron/pdfjs-express-viewer";

interface PDFViewerProps {
  initialDoc: string;
  licenseKey: string;
  page: number;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  initialDoc,
  licenseKey,
  page,
}) => {
  const viewer = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = useState<typeof WebViewerInstance | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@pdftron/pdfjs-express-viewer").then((WebViewer) => {
        WebViewer.default(
          {
            path: "/webviewer/lib",
            initialDoc,
            licenseKey,
          },
          viewer.current!
        ).then((instance: any) => {
          const { Core, UI } = instance;

          Core.documentViewer.addEventListener("documentLoaded", () => {
            Core.documentViewer.setCurrentPage(page);
            console.log("document loaded");
          });

          instance.UI.disableElements(["menuButton"]);

          setInstance(instance);
        });
      });
    }

    return () => {
      if (instance) {
        instance.UI.dispose();
      }
    };
  }, [initialDoc, licenseKey, page, instance]);

  return <div className="webviewer w-full h-full" ref={viewer}></div>;
};

export default PDFViewer;
