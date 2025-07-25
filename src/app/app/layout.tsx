import type { Metadata } from "next";

import WebSidebar from "@/layouts/Sidebar/WebSidebar";

export const metadata: Metadata = {
  title: "local-ink",
  description: "localink newspaper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <WebSidebar />
      <div className=" bg-gray-100 md:ml-45   flex-1">{children}</div>
    </div>
  );
}
