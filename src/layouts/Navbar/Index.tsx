import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const isMobile = useMobile();
  const pathname = usePathname();
  const { toggleSidebarCollapse, sidebarCollapsed } = useDashboardStore();

  const renderPageName = () => {
    const isManage = pathname.endsWith("manage");
    if (isManage) {
      return pathname.replaceAll("/", " ").replace("manage", "") + "management";
    }
    return pathname.replaceAll("/", " ");
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between fixed top-0 right-0 border-b border-b-neutral-200 p-4 w-screen md:w-auto bg-neutral-100 h-16 !z-[50]",
        isMobile ? "" : sidebarCollapsed ? "left-20" : "left-60"
      )}
    >
      <div className="flex items-center text-neutral-500">
        <Button
          size="icon"
          onClick={toggleSidebarCollapse}
          variant="ghost"
          className="hidden md:block"
        >
          <i className="pi pi-bars" />
        </Button>
        <p className="uppercase text-sm">{renderPageName()}</p>
      </div>
      <div className="text-sm gap-2 flex text-neutral-600">
        <span>Need help?</span>
        <Link href="/" className="underline">
          Get Support
        </Link>
      </div>
    </nav>
  );
}
