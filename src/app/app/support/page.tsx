import { Button } from "@/components/ui/button";
import Header from "@/views/header";

import React from "react";

const SupportForm: React.FC = () => {
  return (
    <div className=" bg-gray-200 md:ml-5 md:px-1">
      <Header
        className={"bg-white justify-between px-6 items-center flex h-20"}
      />
      <div className="min-h-screen flex   ">
        <div className="w-full max-w-4xl  p-4   rounded-lg ">
          <h2 className="sm:text-xl font-inter  text-base leading-none tracking-normal lg:text-2xl  font-semibold ">
            Support
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-4">
            Email:{" "}
            <a
              href="mailto:support@local-ink.ca"
              className="font-bold text-base hover:underline"
            >
              support@local-ink.ca
            </a>
          </p>

          <hr className="my-6 border-gray-300" />

          <p className="text-sm sm:text-base lg:text-lg mb-4">
            Have a question or concern? Drop us a line!
          </p>

          <textarea
            className="w-full h-28 sm:h-40 lg:h-48 p-4 bg-white border border-gray-300 rounded-md resize-none text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your message..."
          ></textarea>

          <Button
            type="submit"
            className="mt-6 w-full bg-black text-white text-sm sm:text-base lg:text-lg font-medium py-2.5 sm:py-3 rounded-md hover:bg-gray-800 transition"
          >
            {" "}
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
