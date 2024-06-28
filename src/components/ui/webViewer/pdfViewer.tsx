"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import WebViewerInstance from "@pdftron/pdfjs-express-viewer";

interface PDFViewerProps {
  initialDoc: string;
  licenseKey: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ initialDoc, licenseKey }) => {
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
            console.log("document loaded");
          });

          Core.documentViewer.addEventListener(
            "pageNumberUpdated",
            (pageNumber: number) => {
              console.log(`Page number is: ${pageNumber}`);
            }
          );

          UI.setHeaderItems((header: any) => {
            header.push({
              type: "actionButton",
              img: "https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg",
              onClick: () => {
                const currentPage = Core.documentViewer.getCurrentPage();
                const totalPages = Core.documentViewer.getPageCount();
                const atLastPage = currentPage === totalPages;

                if (atLastPage) {
                  Core.documentViewer.setCurrentPage(1);
                } else {
                  Core.documentViewer.setCurrentPage(currentPage + 1);
                }
              },
            });
          });

          setInstance(instance);
        });
      });
    }

    return () => {
      if (instance) {
        instance.UI.dispose();
      }
    };
  }, [initialDoc, licenseKey, instance]);

  return <div className="webviewer w-full h-full" ref={viewer}></div>;
};

export default PDFViewer;
