"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
  open: boolean;
  showCloseButton?: boolean;
  onOpenChange: (val: boolean) => void;
  options?: Partial<ConfirmationModalProps>;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string; // Added className prop
}

interface ConfirmationModalProps {
  title: string;
  message: string;
  description?: string;
}

export default function Modal({
  open,
  showCloseButton = true,
  options,
  children,
  footer,
  onOpenChange,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "w-full max-w-[100vw] h-screen max-h-[100vh] p-0 m-0",
          className
        )} // Apply custom className
      >
        <DialogHeader className={cn(!options?.title && "opacity-0 h-0")}>
          <DialogTitle>{options?.title}</DialogTitle>
          {options?.description && (
            <DialogDescription>{options?.description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
