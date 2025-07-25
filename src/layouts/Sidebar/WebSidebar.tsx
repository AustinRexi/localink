"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const WebSidebar: React.FC = () => {
  const navItems = [
    {
      href: "/app",
      icon: "/icons/sidebar/newstandicon.svg",
      alt: "Newsstand",
      label: "Newsstand",
    },
    {
      href: "/app/discover",
      icon: "/icons/sidebar/searchicon.svg",
      alt: "Discover",
      label: "Discover",
    },
    {
      href: "/app/myaccount",
      icon: "/icons/sidebar/usericon.svg",
      alt: "My Account",
      label: "My Account",
    },
    {
      href: "/app/support",
      icon: "/icons/sidebar/supporticon.svg",
      alt: "Support",
      label: "Support",
    },
  ];

  return (
    <>
      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 w-full rounded-xl bg-gray-800 text-white flex justify-around items-center p-2 z-10 md:hidden">
        <ul className="flex justify-between w-full">
          {navItems.map((item, index) => (
            <li key={index} className="text-center">
              <Link
                href={item.href}
                className="flex flex-col items-center text-xs p-2 hover:bg-gray-700 rounded"
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={18}
                  height={18}
                  className="mb-1"
                  onError={(e) => (e.currentTarget.style.display = "none")} // Fallback for missing images
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar for Desktop */}
      <div className="hidden md:flex fixed inset-y-0 left-0 w-50 bg-gray-800 text-white flex-col h-screen transition-all duration-300 ease-in-out z-10">
        {/* Logo or Header */}
        <div className="p-4 border-b border-gray-700">
          {/* <h2 className="text-xl font-bold">App Name</h2>
          <Image src="/images/logo.png" alt="logo" width={40} height={28} /> */}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={24}
                    height={24}
                    className="mr-2"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Fallback for missing images
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default WebSidebar;
