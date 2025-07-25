"use client";

import { Button } from "@/components/ui/button";
import Header from "@/views/header";
import Image from "next/image";
import { useState } from "react";

const papers = [
  {
    id: 1,
    name: "Western Wheel",
    image: "/images/western-wheel-logo.png",
    status: "Subscribed",
  },
  {
    id: 2,
    name: "Calgary Herald",
    image: "/images/calgary-herald.png",
    status: "Subscribe",
  },
  {
    id: 3,
    name: "Calgary Sun",
    image: "/images/sun.png",
    status: "Renew",
  },
  {
    id: 4,
    name: "Toby Courier",
    image: "/images/tobycourier.png",
    status: "Subscribe",
  },
];

export default function Discover() {
  const [search, setSearch] = useState("");

  const filtered = papers.filter((paper) =>
    paper.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen p-6 bg-gray-50 font-sans">
      {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <span className="font-bold text-xl">Local INK</span>
        </div>
        <button>
          <Image
            src="/icons/other/bellicon.svg"
            alt="Notifications"
            width={24}
            height={24}
          />
        </button>
      </div> */}
      <Header />
      {/* Updated search input with icon */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Find a paper..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Image
            src="/icons/other/searchicon.svg" // Replace with actual path
            alt="Search icon"
            width={16}
            height={16}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          Papers Near You <span className="text-gray-500">(T1S 2E1)</span>
        </h2>

        <Button className="px-2 py-1 bg-white text-black text-sm border border-gray-600 shadow rounded flex space-x-2">
          {" "}
          Radius: 50k{" "}
          <Image
            src="/icons/other/locationicon.svg" // Replace with actual path
            alt="Search icon"
            width={16}
            height={16}
          />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mt-6">
        {filtered.map((paper) => (
          <div
            key={paper.id}
            className="w-full relative rounded-lg overflow-hidden shadow flex flex-col h-full"
          >
            <div className="relative w-full h-48 flex items-center justify-center bg-gray-100">
              <Image
                src={paper.image}
                alt={paper.name}
                width={150} // Nominal width for Next.js Image optimization
                height={400} // Nominal height for Next.js Image optimization
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  height: "auto",
                  width: "auto",
                }}
                className="rounded"
              />
            </div>
            <div className="p-2 flex flex-col flex-grow">
              <h3 className="text-center text-sm font-medium">{paper.name}</h3>
              <button
                className={`w-full mt-2 text-sm rounded px-2 py-1 ${
                  paper.status === "Subscribed"
                    ? "bg-red-500 text-white"
                    : paper.status === "Renew"
                    ? "bg-gray-300 text-black"
                    : "bg-white border border-gray-600 text-black"
                }`}
              >
                {paper.status}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-gray-800 text-white rounded text-sm">
        Toby Courier has been added to your collection!
      </div>
    </main>
  );
}
