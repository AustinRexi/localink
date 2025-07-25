"use client";

import { useState } from "react";
import Image from "next/image";
import TextInput from "@/components/Input/TextInput";
import UserMap from "@/components/UserMap";
import { Button } from "@/components/ui/button";

export default function NewspaperDiscover({ onContinueButton }) {
  // const [location, setLocation] = useState("Calgary");
  const [postalCode, setPostalCode] = useState("T1S 2E1");
  // const [radius, setRadius] = useState(50);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "1",
      title: "Western Wheel",
      imageUrl: "/images/newsimage1.png",
      issues: "62 published issues",
    },
    {
      id: "2",
      title: "Calgary Herald",
      imageUrl: "/images/newsimage2.png",
      issues: "3 published issues",
    },
    {
      id: "3",
      title: "Calgary Sun",
      imageUrl: "/images/sun.png",
      issues: "120 published issues",
    },
  ];

  return (
    <div className="min-h-screen  p-1">
      <h1 className="text-2xl font-bold text-center mb-4">
        Discover local newspapers!
      </h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="relative w-full mb-2">
          <TextInput
            type="text"
            value="Canada"
            readOnly
            className="w-full p-2 border rounded pl-12 pr-8"
            placeholder="Select Country"
          />
          <Image
            src="/images/canada.png"
            alt="Canada Flag"
            width={24}
            height={16}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          />
          <span className="absolute left-10 top-1/2 transform -translate-y-1/2"></span>
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
            ✓
          </span>
        </div>
        <div className="relative w-full mb-2">
          <TextInput
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full p-2 border rounded pr-8"
            placeholder="Enter Postal Code"
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500">
            ✓
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <UserMap />
        <div className="flex justify-between mt-4">
          <p className="mb-2 font-inter font-semibold text-base leading-none tracking-normal">
            Select your preferred digital editions
          </p>
          <span className="text-red-500 font-inter font-semibold text-base leading-none tracking-normal">
            5 found
          </span>
        </div>
        <p className="w-30 text-center font-inter text-sm p-1 font-semibold leading-none tracking-normal text-black bg-red-300 mt-3 mb-4">
          Western Wheel
        </p>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mt-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white-100 p-2 rounded text-center cursor-pointer"
              onClick={() => setSelectedCard(card.id)}
            >
              <div className="relative">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={350}
                  height={350}
                  className="mx-auto mb-1 hover:bg-red-400 rounded transition duration-200"
                />
                <input
                  type="radio"
                  checked={selectedCard === card.id}
                  onChange={() => setSelectedCard(card.id)}
                  className="w-6 h-6 text-red-500 focus:ring-0 absolute top-0 right-0"
                />
                {selectedCard === card.id && (
                  <Image
                    src="/icons/other/checkedicon.svg"
                    width={20}
                    height={20}
                    alt="select"
                    className="absolute top-0 right-0 text-green-500"
                  />
                )}
              </div>
              <p
                className={`font-inter font-semibold text-base leading-none tracking-normal${
                  selectedCard === card.id ? "text-red-500" : "text-[#595959]"
                }`}
              >
                {card.title}
              </p>
              <p className="text-sm text-[#595959]">{card.issues}</p>
            </div>
          ))}
        </div>
      </div>

      <Button
        className="w-full bg-black text-white p-2 rounded mt-3"
        onClick={onContinueButton}
      >
        {" "}
        Continue{" "}
      </Button>
      <div className="w-full bg-gray-300 h-2 rounded mt-6">
        <div className="bg-red-500 h-2 rounded" style={{ width: "55%" }}></div>
      </div>
    </div>
  );
}
