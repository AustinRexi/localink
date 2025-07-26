"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the props interface for SubscriptionCard
interface SubscriptionCardProps {
  onClose: () => void; // Define onClose as a function that takes no arguments and returns void
}

const SubscriptionCard = ({ onClose }: SubscriptionCardProps) => {
  const [selected, setSelected] = useState<"monthly" | "annually">("monthly");

  return (
    <div
      className="
        max-w-sm mx-auto 
        p-4 sm:p-3 xs:p-2 
        bg-white rounded-xl shadow-md 
        space-y-4 sm:space-y-3 xs:space-y-2
      "
    >
      {/* Header */}
      <div className="flex items-start space-x-3 sm:space-x-2">
        <Image
          src="/images/sun.png"
          alt="Calgary Sun Logo"
          width={40}
          height={40}
          className="rounded sm:w-8 sm:h-8 xs:w-6 xs:h-6"
        />
        <div>
          <h2
            className="
              text-lg sm:text-base xs:text-sm 
              font-semibold
            "
          >
            Calgary Sun
          </h2>
          <p
            className="
              text-sm sm:text-xs xs:text-xs 
              text-gray-500
            "
          >
            Small marketing details, summary that perhaps the paper can write
            (max chars)
          </p>
        </div>
      </div>

      {/* Subscription Options */}
      <div className="space-y-2 sm:space-y-1.5 xs:space-y-1">
        <p
          className="
            font-medium 
            text-base sm:text-sm xs:text-xs
          "
        >
          Select your subscription type:
        </p>

        <div
          onClick={() => setSelected("monthly")}
          className={`
            flex items-center 
            p-3 sm:p-2 xs:p-1.5 
            border rounded-lg cursor-pointer
            ${
              selected === "monthly"
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }
          `}
        >
          <div
            className={`
              w-4 h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 
              rounded-full mr-3 sm:mr-2 xs:mr-1.5 
              border-2
              ${
                selected === "monthly"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-400"
              }
            `}
          ></div>
          <span
            className={`
              text-sm sm:text-xs xs:text-xs 
              font-medium
              ${selected === "monthly" ? "text-red-500" : "text-gray-800"}
            `}
          >
            Monthly - $2.99/mo
          </span>
        </div>

        <div
          onClick={() => setSelected("annually")}
          className={`
            flex items-center 
            p-3 sm:p-2 xs:p-1.5 
            border rounded-lg cursor-pointer
            ${
              selected === "annually"
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }
          `}
        >
          <div
            className={`
              w-4 h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3 
              rounded-full mr-3 sm:mr-2 xs:mr-1.5 
              border-2
              ${
                selected === "annually"
                  ? "border-red-500 bg-red-500"
                  : "border-gray-400"
              }
            `}
          ></div>
          <span
            className={`
              text-sm sm:text-xs xs:text-xs 
              font-medium
              ${selected === "annually" ? "text-red-500" : "text-gray-800"}
            `}
          >
            Annually - $28.70
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        className="
          w-full bg-black text-white 
          py-2 sm:py-1.5 xs:py-1 
          rounded-lg 
          text-sm sm:text-xs xs:text-xs 
          font-semibold hover:opacity-90 transition
        "
      >
        Continue to Payment
      </Button>

      {/* Back Button */}
      <Button
        onClick={onClose}
        className="
          block mx-auto 
          text-gray-500 bg-inherit 
          text-sm sm:text-xs xs:text-xs 
          hover:underline hover:bg-inherit
        "
      >
        Back
      </Button>
    </div>
  );
};

export default SubscriptionCard;
