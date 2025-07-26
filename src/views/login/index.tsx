import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the props interface
interface HomeProps {
  onContinueButton: () => void; // Type for the button click handler
}

export default function Home({ onContinueButton }: HomeProps) {
  const valuePropositions = [
    {
      id: 1,
      text: "Value proposition number one.",
      icon: "/icons/other/canadaicon.svg",
    },
    {
      id: 2,
      text: "Lets add a second here! Alright!",
      icon: "/icons/other/canadaicon.svg",
    },
    {
      id: 3,
      text: "The final value proposition",
      icon: "/icons/other/canadaicon.svg",
    },
  ];

  return (
    <>
      <div className="md:justify-center md:items-center md:h-auto relative md:hidden">
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
          width={100}
          height={100}
          className="absolute top-0 left-0 z-20"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-3">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Canadas Virtual Newsstand
        </h1>
        <p className="text-lg text-center text-gray-600 mb-6 max-w-md whitespace-normal break-words">
          Local link puts your community in your pocket. Get easy access to
          local Canadian newspapers, all in one place!
        </p>
        <ul className="list-none mb-6">
          {valuePropositions.map((prop) => (
            <li key={prop.id} className="flex items-center mb-2">
              <Image
                src={prop.icon}
                alt="Canada Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              {prop.text}
            </li>
          ))}
        </ul>

        <Button
          className="bg-black text-white px-6 py-3 rounded-lg mb-4 font-normal w-full max-w-sm h-[60px]"
          onClick={onContinueButton}
        >
          Get Started
        </Button>
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <a href="#" className="text-red-500 underline">
            Sign in
          </a>
        </p>
      </div>
    </>
  );
}
