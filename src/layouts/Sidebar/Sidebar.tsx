"use client";
import { navLinks } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navigation from "./Navigation";

export default function Sidebar() {
  // TODO: Get nav links based on session/role
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bg-primary-2 h-full overflow-y-auto duration-300",
        sidebarCollapsed ? "w-20" : "w-60"
      )}
    >
      <div className="p-6 bg-white h-16"></div>
      <div className={cn("gradient-primary", sidebarCollapsed ? "p-2" : "p-6")}>
        <div className="flex items-center gap-4 justify-center">
          <Image
            src="/images/western-wheel-logo.png"
            alt="Western wheel org logo"
            width={100}
            height={100}
            className="size-12"
          />
          {!sidebarCollapsed && (
            <div>
              <p className="font-bold text-white">Western Wheel</p>
              <div className="flex items-center gap-4">
                <Link href="/" className="text-white text-sm">
                  Manage
                </Link>
                <span
                  role="button"
                  className="text-white cursor-pointer text-sm"
                >
                  Logout
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navigation navLinks={navLinks} />
    </aside>
  );
}
