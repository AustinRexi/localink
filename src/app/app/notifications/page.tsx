import { Button } from "@/components/ui/button";

import Image from "next/image";

// Reusable ToggleSwitch component
const ToggleSwitch = ({ checked = false }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
  </label>
);
interface NotificationSettingsProps {
  onClose?: () => void;
}
export default function NotificationSettings({
  onClose,
}: NotificationSettingsProps) {
  const notificationGroups = [
    {
      title: "Global Notifications",
      items: [
        { label: "Allow all subscribed-to papers to email me", checked: false },
        {
          label: "Push notifications for all papers new issues",
          checked: true,
        },
      ],
    },
    {
      title: "Western Wheel",
      items: [
        { label: "Can email me", checked: false },
        { label: "Push notifications when new issues added", checked: false },
      ],
    },
  ];

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="flex items-center bg-white justify-between mb-6">
        <Image
          src="/images/logo.png"
          alt="Local Ink Canada Logo"
          width={150}
          height={50}
          className="object-contain"
        />
        <Button onClick={onClose} className="bg-white hover:bg-white">
          <Image
            src="/icons/other/closeicon.svg"
            alt="Close"
            width={24}
            height={24}
            className="object-contain"
          />
        </Button>
      </div>

      <div className="space-y-4 p-2">
        {notificationGroups.map((group, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold">{group.title}</h2>
            {group.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between p-4 rounded-lg shadow"
              >
                <span>{item.label}</span>
                <ToggleSwitch checked={item.checked} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
