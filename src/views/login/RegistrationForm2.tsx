"use client";

import React, { useState } from "react";
import Image from "next/image";
import TextInput from "@/components/Input/TextInput";
import { Button } from "@/components/ui/button";

const GenderButton = ({ gender, selectedGender, setGender, icon, label }) => {
  return (
    <button
      onClick={() => setGender(gender)}
      className={`flex-1 p-2 border h-24 rounded-md ${
        selectedGender === gender ? "border-red-500" : "border-gray-300"
      }`}
    >
      <Image
        src={icon}
        alt={label}
        width={24}
        height={24}
        className="mx-auto"
      />
      <span className="block text-center text-sm mt-4">{label}</span>
    </button>
  );
};

export default function RegistrationForm2({ onContinueButton }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [allowContact, setAllowContact] = useState(false);

  const genderOptions = [
    { value: "male", label: "Male", icon: "/icons/other/maleicon.svg" },
    { value: "female", label: "Female", icon: "/icons/other/femaleicon.svg" },
    { value: "other", label: "Other", icon: "/icons/other/othericon.svg" },
  ];

  return (
    <div className="max-w-md mx-auto p-8 mt-10 space-y-6  rounded-lg">
      <div className="mb-4">
        <label className="block text-black font-inter font-semibold text-base leading-none tracking-normal">
          Your Name:
        </label>
        <TextInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Alex"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-inter font-semibold text-base leading-none tracking-normal">
          Your Surname:
        </label>
        <TextInput
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Marshall"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-inter font-semibold text-base leading-none tracking-normal">
          Your age:
        </label>
        <TextInput
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="34"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-inter font-semibold text-base leading-none tracking-normal">
          Your gender:
        </label>
        <div className="flex space-x-4 mt-2">
          {genderOptions.map((option) => (
            <GenderButton
              key={option.value}
              gender={option.value}
              selectedGender={gender}
              setGender={setGender}
              icon={option.icon}
              label={option.label}
            />
          ))}
        </div>
      </div>
      <label className="block text-black font-inter font-semibold text-base leading-none tracking-normal">
        Communications
      </label>
      <div className="mb-10">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={allowContact}
            onChange={(e) => setAllowContact(e.target.checked)}
            className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700 mt-4">
            Allow newspapers that I am subscribed to can contact me. This can be
            changed later.
          </span>
        </label>
      </div>

      <Button
        className="w-full bg-black text-white p-2 rounded-md"
        onClick={onContinueButton}
      >
        {" "}
        Continue
      </Button>
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div className="bg-red-500 h-2 rounded" style={{ width: "10%" }}></div>
      </div>
    </div>
  );
}
