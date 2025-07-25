"use client";

import Modal from "@/components/Modal";
import Header from "@/views/header";
import SubscriptionCard from "@/views/subscription";
import Image from "next/image";
import { useState } from "react";

// Define types for location and subscription data
interface Location {
  country: string;
  postalCode: string;
}

interface Subscription {
  id: string;
  name: string;
  status: "Active" | "Expired";
  price: string;
}

const initialLocation: Location = {
  country: "Canada",
  postalCode: "T1S 2E1",
};

const initialSubscriptions: Subscription[] = [
  { id: "1", name: "Western Wheel", status: "Active", price: "$2.99/mo" },
  { id: "2", name: "Calgary Herald", status: "Expired", price: "$2.99/mo" },
];

// Reusable LocationItem component to avoid repeating div structure
const LocationItem: React.FC<{
  label: string;
  value: string;
  onChange: () => void;
}> = ({ label, value, onChange }) => (
  <div className="flex justify-between border-b-2 text-sm sm:text-base lg:text-lg py-1">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold">{value}</span>
    <button className="ml-2" onClick={onChange}>
      change
    </button>
  </div>
);

// Reusable SubscriptionItem component to avoid repeating subscription card structure
const SubscriptionItem: React.FC<{
  subscription: Subscription;
  onAction: (id: string) => void;
  onRenew: (subscription: Subscription) => void;
}> = ({ subscription, onAction, onRenew }) => (
  <div className="bg-white p-4 shadow-2xl rounded-lg mb-3 flex justify-between items-center">
    <div>
      <p className="font-inter font-normal text-lg sm:text-base lg:text-lg py-2">
        {subscription.name}
      </p>
      <p
        className={`sm:text-base font-inter font-bold text-xs leading-none tracking-normal ${
          subscription.status === "Active" ? "text-red-500" : "text-red-500"
        }`}
      >
        {subscription.status}{" "}
        <span className="font-inter font-normal text-sm text-black leading-none tracking-normal">
          {subscription.price}
        </span>
      </p>
    </div>
    <button
      className="text-sm sm:text-base"
      onClick={() =>
        subscription.status === "Active"
          ? onAction(subscription.id)
          : onRenew(subscription)
      }
    >
      {subscription.status === "Active" ? "cancel" : "renew"}
    </button>
  </div>
);

const MyAccount: React.FC = () => {
  // State for dynamic data
  const [location, setLocation] = useState<Location>(initialLocation);
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(initialSubscriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  // Handlers for dynamic updates
  const handleLocationChange = (field: keyof Location) => {
    setLocation((prev) => ({
      ...prev,
      [field]: prompt(`Enter new ${field}`) || prev[field],
    }));
  };

  const handleSubscriptionAction = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: sub.status === "Active" ? "Expired" : "Active",
            }
          : sub
      )
    );
  };

  const handleRenew = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header className="bg-white justify-between px-6 items-center flex h-20" />
      <main className="flex-1  sm:p-4 lg:p-8 font-sans">
        <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 rounded-lg">
          {/* Location Section */}
          <div className="mb-6">
            <h2 className="font-semibold font-inter text-base sm:text-xl lg:text-2xl mb-2">
              Location
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4">
              We use your location information to find your favorite local
              papers.
            </p>
            <LocationItem
              label="Country"
              value={location.country}
              onChange={() => handleLocationChange("country")}
            />
            <LocationItem
              label="Postal Code"
              value={location.postalCode}
              onChange={() => handleLocationChange("postalCode")}
            />
          </div>

          {/* Subscriptions Section */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-2">
              Subscriptions
            </h2>
            {subscriptions.map((subscription) => (
              <SubscriptionItem
                key={subscription.id}
                subscription={subscription}
                onAction={handleSubscriptionAction}
                onRenew={handleRenew}
              />
            ))}
          </div>

          {/* Billing Button */}
          <button className="w-full bg-black text-white py-2 sm:py-3 rounded font-medium text-sm sm:text-base lg:text-lg">
            Billing History
          </button>

          {/* Modal for SubscriptionCard */}
          {isModalOpen && selectedSubscription && (
            <Modal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              showCloseButton={false}
              options={{
                title: `Renew ${selectedSubscription.name}`,
                description: "Complete the subscription renewal process below.",
              }}
              className="w-auto h-auto p-6 bg-white rounded-lg" // Override default width and height
            >
              <SubscriptionCard onClose={closeModal} />
            </Modal>
          )}

          {/* Footer */}
          <div className="mt-8 text-sm sm:text-base lg:text-lg text-center">
            <div className="flex items-center gap-1 border-t-2 border-b-2 justify-between lg:justify-start lg:border-t-0 lg:border-b-0">
              <button className="text-gray-600">Logout</button>
              <Image
                src="/icons/other/logouticon.svg"
                alt="logout"
                width={14}
                height={14}
              />
            </div>
            <button className="text-red-600 mt-2">Delete Account</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
