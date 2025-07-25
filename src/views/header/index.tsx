"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import NotificationSettings from "../../components/notifications";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <span className="font-bold text-xl">Local INK</span>
      </div>

      <div className="relative w-5 h-5">
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        <button onClick={() => setIsModalOpen(true)}>
          <Image
            src="/icons/other/bellicon.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        showCloseButton={false}
      >
        <NotificationSettings onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Header;
