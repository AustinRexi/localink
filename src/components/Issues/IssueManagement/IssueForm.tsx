"use client";

import { DatePickerInput } from "@/components/Input/DatePickerInput";
import ImageUploadButton from "@/components/Input/ImageUploadButton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMobile } from "@/hooks/useMobile";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import IssueUploader from "./IssueUploader";

const IssuePdfViewer = dynamic(() => import("./IssuePdfViewer"), {
  ssr: false,
});

export default function IssueForm() {
  const isMobile = useMobile();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [image, setSelectedImage] = useState<File | null>(null);

  const renderDynamicImage = useMemo(() => {
    if (image && image.size) return URL.createObjectURL(image);
    return "/images/issue-image-2.png";
  }, [image]);

  console.log("pdf_file", pdfFile);

  //
  const IssueFormFooter = () => (
    <div className="flex flex-col sm:flex-row xl:flex-col gap-2 xl:sticky xl:bottom-0 xl:left-4">
      <Button
        className="bg-neutral-300 text-neutral-700 hover:bg-neutral-30 w-full sm:w-1/2 xl:w-full"
        block={!isMobile}
      >
        Preview in E-Reader
      </Button>
      <Button className="w-full sm:w-1/2 xl:w-full">Publish & Schedule</Button>
    </div>
  );

  return (
    <div className="grid xl:grid-cols-4 gap-4 bg-white rounded-xl xl:max-h-[calc(100vh-130px)] xl:overflow-hidden xl:overflow-y-auto xl:relative">
      <div className="xl:col-span-1 xl:border-r xl:border-neutral-200 p-6 xl:sticky top-0 left-0 flex flex-col gap-4 h-auto xl:max-h-[calc(100vh-130px)] overflow-y-auto">
        {/* Right - side panel */}
        <div className="xl:flex-1 flex flex-col gap-6 overflow-y-auto">
          <p className="text-lg font-semibold mb-4">Add Issue</p>

          {/* Release Schedule */}
          <div className="">
            <p className="text-neutral-700 mb-2 text-sm">Release Schedule</p>
            <DatePickerInput />
          </div>

          {/* Pricing Category */}
          <div className="">
            <p className="text-neutral-700 mb-2 text-sm">Pricing Category</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"1.50"}>Default Price ($1.50)</SelectItem>
                <SelectItem value={"6.50"}>Sunday Edition ($6.50)</SelectItem>
                <SelectItem value={"2.50"}>Festival Week ($2.50)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image */}
          <div className="flex flex-col gap-4">
            <p className="text-neutral-700 mb-2 text-sm">Cover Photo</p>
            <Image
              src={renderDynamicImage}
              alt="western wheel newspaper"
              className="object-cover h-52"
              objectFit="cover"
              width={150}
              height={200}
            />

            <div>
              <p className="text-neutral-700 mb-2 text-sm">
                Set custom cover photo
              </p>
              <ImageUploadButton
                onFileChange={(img) => {
                  console.log("selected_image", img);
                  setSelectedImage(img);
                }}
                label={image ? "Change image" : "Choose image"}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        {!isMobile && <IssueFormFooter />}
      </div>

      {/* Left - main form */}
      <div className="xl:col-span-3 p-6 overflow-y-auto xl:h-full h-auto">
        <IssueUploader
          onDocumentChange={(doc) => {
            setPdfFile(doc);
            console.log("Uploaded_document", doc);
          }}
        />
        <IssuePdfViewer file={pdfFile as File} />
        {isMobile && <IssueFormFooter />}
      </div>
    </div>
  );
}
