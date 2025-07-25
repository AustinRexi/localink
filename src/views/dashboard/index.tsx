"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import History from "./History";
import BookMarked from "./BookMarked";
import NotificationSettings from "../../components/notifications";
import Modal from "@/components/Modal";
import SubscriptionCard from "../subscription";

interface Issue {
  date: string;
  cover: string;
  icons: string;
}

const subscriptions = [
  {
    name: "Calgary Herald",
    logo: "/images/calgary-herald.png",
    status: "Expired subscription",
    action: "Renew",
    issues: "All Issues",
    isSubscribed: false,
    icon: "/icons/other/upicon.svg",
  },
  {
    name: "Calgary Sun",
    logo: "/images/sun.png",
    status: "Subscription required",
    action: "Subscribe - $5.99/mo",
    isSubscribed: false,
    icon: "/icons/other/downicon.svg",
  },
];

type Edition = {
  date: string;
  image: string;
  price: string;
};

const editions: Edition[] = [
  {
    date: "May 3, 2025",
    image: "/images/newsimage1.png",
    price: "$1.50",
  },
  {
    date: "May 2, 2025",
    image: "/images/newsimage1.png",
    price: "$1.50",
  },
  {
    date: "May 1, 2025",
    image: "/images/newsimage1.png",
    price: "$1.50",
  },
];

const issues: Issue[] = [
  {
    date: "May 3, 2025",
    cover: "/images/newsimage1.png",
    icons: "/icons/other/selectedbookmarkicon.svg",
  },
  {
    date: "May 2, 2025",
    cover: "/images/newsimage2.png",
    icons: "/icons/other/eyeicon.svg",
  },
  {
    date: "May 1, 2025",
    cover: "/images/newsimage3.png",
    icons: "/icons/other/bookmarkicon.svg",
  },
];

const tabs = ["Collection", "History", "Bookmarked"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Collection");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(
    subscriptions[0]
  );

  const closeModal = () => {
    setIsSubscriptionModalOpen(false);
    setSelectedSubscription(null);
  };

  const handleOrderClick = (subscriptionName: string) => {
    const subscription = subscriptions.find(
      (sub) => sub.name === subscriptionName
    );
    if (subscription) {
      setSelectedSubscription(subscription);
      setIsSubscriptionModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Local Ink"
              width={36}
              height={36}
            />
            <h1 className="text-xl font-bold">Local Ink</h1>
          </div>
          <div className="relative w-5 h-5">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            <button onClick={() => setIsNotificationModalOpen(true)}>
              <Image
                src="/icons/other/bellicon.svg"
                alt="Bell Icon"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex space-x-8 border-b h-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-3 border-red-500 text-red-500"
                  : "text-gray-500 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Collection" && (
          <>
            <div className="flex justify-between items-center border-b h-16 bg-white mb-4 p-2">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/western-wheel-logo.png"
                  alt="Western Wheel"
                  width={32}
                  height={32}
                />
                <div className="text-sm">
                  <div className="font-semibold text-base">Western Wheel</div>
                  <div className="text-xs text-gray-500">Subscribed</div>
                </div>
              </div>
              <div className="flex space-x-2 text-sm">
                <Button className="border rounded px-2 py-1 text-xs bg-white text-black w-16 h-7 hover:bg-gray-100">
                  All Issues
                </Button>
                <Button className="border rounded px-2 py-1 text-xs bg-white text-black w-16 h-7 hover:bg-gray-100">
                  Manage
                </Button>
                <Image
                  src="/icons/other/downicon.svg"
                  alt="select"
                  width={17}
                  height={17}
                />
              </div>
            </div>

            {/* Issue Covers (GRID layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {issues.map((issue) => (
                <div key={issue.date} className="w-full">
                  <div className="items-center justify-between flex px-3">
                    <p className="text-xs mb-1">{issue.date}</p>
                    <Image
                      src={issue.icons}
                      width={17}
                      height={17}
                      alt="icon"
                    />
                  </div>
                  <div className="w-full h-0 pb-[100%] relative shadow-lg hover:bg-red-200 transition-colors duration-300 overflow-hidden">
                    <Image
                      src={issue.cover}
                      alt={`Cover for ${issue.date}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full max-w-6xl bg-white mx-auto mt-4 px-2 space-y-4">
              {subscriptions.map((sub, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md p-2"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={sub.logo}
                      alt={`${sub.name} logo`}
                      width={40}
                      height={30}
                      className="rounded"
                    />
                    <div>
                      <h3 className="font-medium text-base leading-none tracking-normal">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-gray-500">{sub.status}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {sub.name === "Calgary Herald" ? (
                      <div className="flex space-x-2">
                        <Button className="text-xs border border-gray-300 bg-white text-black h-9 w-18 px-2 py-1 rounded hover:bg-gray-100">
                          {sub.issues}
                        </Button>
                        <Button className="text-xs bg-white text-black h-9 w-18 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
                          {sub.action}
                        </Button>
                        <Image
                          src={sub.icon}
                          alt="icon"
                          width={17}
                          height={17}
                        />
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <Button className="text-xs bg-white h-9 w-32 text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50">
                          {sub.action}
                        </Button>
                        <Image
                          src={sub.icon}
                          alt="icon"
                          width={17}
                          height={17}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full max-w-7xl mx-auto bg-gray-100 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {editions.map((edition, index) => (
                  <div key={index} className="">
                    <p className="text-sm font-medium mb-2">{edition.date}</p>
                    <div className="relative rounded border border-gray-300 overflow-hidden bg-white">
                      <Image
                        src={edition.image}
                        alt={`Edition from ${edition.date}`}
                        width={160}
                        height={200}
                        className="opacity-60 w-full h-auto"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Image
                          src="/icons/other/lockedicon.svg"
                          alt="Locked"
                          width={40}
                          height={40}
                          className="mb-2"
                        />
                        <button
                          onClick={() => handleOrderClick("Calgary Sun")}
                          className="text-xs text-red-600 border font-inter font-medium leading-none tracking-normal border-red-600 px-3 py-1 rounded hover:bg-red-50 bg-white"
                        >
                          Order - {edition.price}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab === "History" && <History />}
        {activeTab === "Bookmarked" && <BookMarked />}

        {/* Modal for Notification Settings */}
        <Modal
          open={isNotificationModalOpen}
          onOpenChange={setIsNotificationModalOpen}
          showCloseButton={false}
        >
          <NotificationSettings
            onClose={() => setIsNotificationModalOpen(false)}
          />
        </Modal>

        {/* Modal for Subscription Renewal */}
        {isSubscriptionModalOpen && selectedSubscription && (
          <Modal
            open={isSubscriptionModalOpen}
            onOpenChange={setIsSubscriptionModalOpen}
            showCloseButton={false}
            options={{
              title: `Renew ${selectedSubscription.name}`,
              description: "Complete the subscription renewal process below.",
            }}
            className="w-auto h-auto p-6 bg-white rounded-lg"
          >
            <SubscriptionCard onClose={closeModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
