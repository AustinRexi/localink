"use client";

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface IssuePdfViewerProps {
  file?: File;
}

export default function IssuePdfViewer({ file }: IssuePdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [loadingDocument, setLoadingDocument] = useState(true);
  const [pageNumber] = useState<number>(1);

  // Make sure to close loading state.
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loadingDocument) {
        setLoadingDocument(false);
      }
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [loadingDocument]);

  // After loading success.
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setLoadingDocument(false);
  }

  return (
    <div className="py-4">
      <div className="mb-4">
        {numPages > 0 && (
          <p className="font-semibold text-neutral-700">
            Found Pages ({numPages})
          </p>
        )}
      </div>

      {loadingDocument && (
        <div className="grid grid-cols-5 gap-4">
          {Array.from(new Array(10)).map((index) => (
            <div key={index} className="skeleton-loader w-20 h-48" />
          ))}
        </div>
      )}

      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex flex-wrap gap-3 mb-8"
        loading={undefined}
      >
        {Array.from(new Array(numPages)).map((el, index) => (
          <Page
            pageNumber={index + 1}
            width={150}
            height={200}
            className="!max-h-40 border border-neutral-100"
            key={`page_${index + 1}`}
          />
        ))}
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
