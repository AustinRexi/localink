"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import Dropzone from "react-dropzone";

interface IssueUploaderProps {
  onDocumentChange: (doc: any) => void;
}

export default function IssueUploader(props: IssueUploaderProps) {
  const { onDocumentChange } = props;

  const handleDocumentDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      // Check file type / file size
      const file = acceptedFiles[0];
      onDocumentChange(file);
    },
    [onDocumentChange]
  );

  return (
    <Dropzone onDrop={handleDocumentDrop} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <section
          className="border border-neutral-300 rounded-xl border-dotted bg-neutral-100 p-8 min-h-60 flex flex-col items-center justify-center mb-4"
          {...getRootProps()}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <input {...getInputProps()} />
            <p className="text-lg">Drag PDF file here for this issue</p>
            <Button className="bg-neutral-300 text-neutral-700 hover:bg-neutral-300">
              Browse computer
            </Button>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
