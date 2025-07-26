"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/Input/TextInput";

// Define the props interface
interface RegistrationFormProps {
  onContinueButton: () => void; // Type for the onContinueButton prop
}

export default function RegistrationForm({
  onContinueButton,
}: RegistrationFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      console.log("Form submitted:", { email, password, isRobotChecked });
    }
  };

  const socialButtons = [
    {
      name: "Continue with Google",
      icon: "/icons/other/googleicon.svg",
      bgColor: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      name: "Continue with Microsoft",
      icon: "/icons/other/microsofticon.svg",
      bgColor: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      name: "Continue with Apple",
      icon: "/icons/other/appleicon.svg",
      bgColor: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
    {
      name: "Continue with Facebook",
      icon: "/icons/other/facebook.svg",
      bgColor: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="space-y-3 mb-6">
          {socialButtons.map((social, index) => (
            <Button
              key={index}
              className={`w-full text-gray-300 flex items-start justify-start px-4 py-3 h-12 rounded-md text-sm font-medium transition-colors ${social.bgColor}`}
              onClick={() => console.log(`${social.name} clicked`)}
            >
              <Image
                src={social.icon}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 mr-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {social.name}
            </Button>
          ))}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="px-3 py-2 w-full max-w-sm font-medium text-2xl text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              error={emailError}
              placeholder=" Email address*"
              required
            />
          </div>

          <div>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              className="w-full px-3 py-2 border font-medium text-2xl text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              error={passwordError}
              placeholder=" Password*"
              required
            />
          </div>

          <div className="flex items-center justify-center space-x-2 py-4">
            <input
              type="checkbox"
              id="robot-check"
              checked={isRobotChecked}
              onChange={(e) => setIsRobotChecked(e.target.checked)}
              className="border-gray-300"
            />
            <label htmlFor="robot-check" className="text-sm text-gray-700 mt-2">
              {"I'm not a robot"}
            </label>
            <div className="ml-auto">
              <div className="text-xs text-gray-500">reCAPTCHA</div>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center py-2">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 rounded-md transition-colors"
            disabled={!isRobotChecked}
            onClick={onContinueButton}
          >
            Continue
          </Button>
        </form>

        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-red-500 hover:underline font-medium">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
