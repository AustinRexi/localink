import React from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";

export interface ModalOptionsProps {
  title: string;
  message: string;
  description?: string;
}

export interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  options: ModalOptionsProps;
  cancelText?: string;
  okText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function ConfirmationModal({
  open,
  options,
  okText,
  cancelText,
  onCancel,
  onOk,
  onOpenChange,
}: ConfirmationModalProps) {
  const ModalFooter = () => (
    <div className="flex flex-col gap-2 w-full">
      <Button
        block
        className="bg-neutral-800 hover:bg-neutral-900"
        onClick={() => {
          onOk?.();
        }}
      >
        {okText || "Ok"}
      </Button>
      <Button
        block
        onClick={() => onCancel?.()}
        className="bg-neutral-100 hover:bg-neutral-100 text-gray-700"
      >
        {cancelText || "Cancel"}
      </Button>
    </div>
  );

  return (
    <Modal open={open} onOpenChange={onOpenChange} footer={<ModalFooter />}>
      <div className="flex flex-col gap-2 items-center justify-center text-center mb-4">
        <p className="font-bold text-xl">{options.title}</p>
        <p className="text-neutral-500">{options.message}</p>
      </div>
    </Modal>
  );
}
