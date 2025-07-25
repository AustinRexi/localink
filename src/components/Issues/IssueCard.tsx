import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface IssueCardProps {
  onDelete: () => void;
}

export default function IssueCard({ onDelete }: IssueCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center gap-4">
        <Image
          src="/images/issue-image.png"
          alt="western wheel newspaper"
          className="min-h-full object-cover"
          width={100}
          height={100}
          objectFit="cover"
        />
        <div className="pt-2 flex-1">
          <div className="mb-6">
            {/* Progress bar */}
            <Progress value={66} className="mb-2" />
            <div className="mb-3">
              <p className="text-neutral-500 text-sm">Pending release:</p>
              <p className="text-neutral-700 text-sm">
                May 11, 22025, 7:00AM MDT
              </p>
            </div>
            <div className="grid grid-cols-2">
              <div className="">
                <p className="text-neutral-500 font-light text-sm">
                  Delivery to:
                </p>
                <p className="text-neutral-700 text-sm">325 subscribers</p>
              </div>
              <div className="">
                <p className="text-neutral-500 font-light text-sm">Price:</p>
                <p className="text-neutral-700 text-sm">$1.50</p>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="w-full flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-neutral-300 text-neutral-700 size-6 px-4"
            >
              <i className="pi pi-download text-xs" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-neutral-300 text-neutral-700 size-6 px-4"
            >
              <i className="pi pi-dollar text-xs" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-neutral-300 text-neutral-700 size-6 px-4"
            >
              <i className="pi pi-chart-bar text-xs" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-neutral-300 text-neutral-700 size-6 px-4"
              onClick={onDelete}
            >
              <i className="pi pi-trash text-xs" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
