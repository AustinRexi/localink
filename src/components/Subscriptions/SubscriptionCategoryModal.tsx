import React from "react";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import { Button } from "../ui/button";

export interface SubscriptionCategoryModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function SubscriptionCategoryModal({
  open,
  onOpenChange,
}: SubscriptionCategoryModalProps) {
  // Subscription modal footer.
  const SubscriptionModalFooter = () => (
    <div className="div flex items-center justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>
      <Button type="button" className="px-8">
        Add
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      options={{
        title: "Add subscription",
      }}
      footer={<SubscriptionModalFooter />}
    >
      <form className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <TextInput placeholder="e.g Morning digest" />
        </div>
        <div>
          <label htmlFor="amount" className="text-sm text-gray-600">
            Amount
          </label>
          <TextInput
            placeholder="Amount"
            type="number"
            inputMode="numeric"
            currency
          />
        </div>
      </form>
    </Modal>
  );
}
