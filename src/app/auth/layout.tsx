import React, { PropsWithChildren } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 md:w-1/2">
        <div className="h-full hidden md:flex md:justify-center md:items-center md:h-auto relative">
          <Image
            src="/images/backgroundimage.png"
            alt="web-image"
            width={600}
            height={637}
            className="relative z-2"
          />
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            className="absolute top-0 left-0 z-20"
          />
        </div>
      </div>
      <div className="flex-1 md:w-1/2 min-h-screen bg-gray-100 flex  justify-center    lg:px-8">
        {children}
      </div>
    </div>
  );
}
