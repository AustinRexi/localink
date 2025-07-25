import React, { useState } from "react";
import Select from "../Input/Select/Select";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import { Button } from "../ui/button";

export interface SubscriberModalProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onOk?: () => void;
  onCancel?: () => void;
}

export default function SubscriberModal({
  open,
  onOpenChange,
}: SubscriberModalProps) {
  //
  const [genderOptions] = useState([
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ]);

  // Subscriber modal footer.
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
        title: "Add subscriber",
      }}
      footer={<SubscriptionModalFooter />}
    >
      <form className="flex flex-col gap-y-4">
        <div>
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <TextInput placeholder="e.g John Doe" />
        </div>
        <div>
          <label htmlFor="age" className="text-sm text-gray-600">
            Age
          </label>
          <TextInput placeholder="Age" type="number" inputMode="numeric" />
        </div>
        <div>
          <label htmlFor="gender" className="text-sm text-gray-600">
            Gender
          </label>

          <Select placeholder="Select gender" options={genderOptions} modal />
        </div>
        <div>
          <label htmlFor="location" className="text-sm text-gray-600">
            Location
          </label>
          <TextInput
            placeholder="Enter location"
            type="address"
            inputMode="numeric"
          />
        </div>
      </form>
    </Modal>
  );
}
