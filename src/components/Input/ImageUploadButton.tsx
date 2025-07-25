/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useCallback, useRef } from "react";
import { Button } from "../ui/button";

interface ImageUploadButtonProps {
  onFileChange?: (image: File) => void;
  label?: string;
}

export default function ImageUploadButton({
  label = "Choose image",
  onFileChange,
}: ImageUploadButtonProps) {
  const imageInputRef = useRef<any>(undefined);

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length) {
        onFileChange?.(files[0]);
      }
    },
    [onFileChange]
  );

  return (
    <>
      <Button
        variant="outline"
        block
        className="border-neutral-300 text-neutral-600"
        onClick={() => imageInputRef?.current?.click()}
      >
        <div className="flex items-center justify-between w-full">
          {label} <i className="pi pi-upload" />
        </div>
      </Button>

      <input
        type="file"
        multiple={false}
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        className="hidden"
        max={1}
        maxLength={1}
      />
    </>
  );
}
