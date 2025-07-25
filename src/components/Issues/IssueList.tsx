"use client";

import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import React, { useState } from "react";
import ConfirmationModal, { ModalOptionsProps } from "../ConfirmationModal";
import IssueCard from "./IssueCard";

interface IssueListProps {
  titleTemplate?: React.ReactNode;
  allIssues: string[];
}

export default function IssueList(props: IssueListProps) {
  const { titleTemplate, allIssues } = props;

  const { sidebarCollapsed } = useDashboardStore();
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationModalOptions, setConfirmationModalOptions] =
    useState<Partial<ModalOptionsProps> | null>(null);

  // Toggle modal open/close
  const toggleModal = (val: boolean) => {
    setConfirmationModalOpen(val);
    if (val) {
      setConfirmationModalOptions({
        title: "Confirm Deletion",
        message:
          "Once you delete the May 11, 2025 issue, subscribers who previously accessed this edition will lose access",
      });
    }
  };

  return (
    <div className="py-4">
      {titleTemplate && <div className="mb-4">{titleTemplate}</div>}
      <div
        className={cn(
          "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
          sidebarCollapsed && "xl:grid-cols-4"
        )}
      >
        {allIssues.map((issue) => (
          <IssueCard
            key={issue}
            onDelete={() => {
              toggleModal(true);
            }}
          />
        ))}
      </div>
      {confirmationModalOpen && (
        <ConfirmationModal
          options={confirmationModalOptions as ModalOptionsProps}
          open={confirmationModalOpen}
          onOpenChange={toggleModal}
          onCancel={() => toggleModal(false)}
          onOk={() => {
            toggleModal(false);
            setTimeout(() => {
              alert("Issue deleted!");
            }, 100);
          }}
          okText="Yes, delete"
        />
      )}
    </div>
  );
}
