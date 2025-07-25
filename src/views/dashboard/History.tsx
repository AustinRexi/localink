"use client";
import { useState } from "react";
import Select from "@/components/Input/Select/Select";
import Image from "next/image";

interface HistoryItem {
  title: string;
  date: string;
  source: string;
  image: string;
  view: string;
  icon: string;
}

const History = () => {
  const [filter, setFilter] = useState("all"); // Filter for papers
  const [sortOrder, setSortOrder] = useState("recent"); // Sorting state

  const historyItems: HistoryItem[] = [
    {
      title: "Calgary Herald",
      date: "May 3, 2025",
      source: "From all papers",
      image: "/images/newsimage1.png",
      view: "/icons/other/eyeicon.svg",
      icon: "/icons/other/selectedbookmarkicon.svg",
    },
    {
      title: "Western Wheel",
      date: "May 2, 2025",
      source: "From all papers",
      image: "/images/newsimage2.png",
      view: "/icons/other/eyeicon.svg",
      icon: "/icons/other/bookmarkicon.svg",
    },
    {
      title: "Western Wheel",
      date: "May 1, 2025",
      source: "Recent",
      image: "/images/newsimage3.png",
      view: "/icons/other/eyeicon.svg",
      icon: "/icons/other/bookmarkicon.svg",
    },
  ];

  // Filter logic
  const filteredItems = historyItems
    .filter((item) => {
      return filter === "all" ? true : item.source === "Recent";
    })
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const filterOptions = [
    { value: "all", label: "From all papers" },
    { value: "recentOnly", label: "Recent only" },
  ];

  const sortOptions = [
    { value: "recent", label: "Recent ↓" },
    { value: "oldest", label: "Oldest ↑" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10  mt-2">
        <Select
          value={filter}
          onChange={(val) => setFilter(val)}
          options={filterOptions}
          itemText="label"
          itemValue="value"
          showSelectAll={false}
          className="flex-none  rounded-md bg-gray-200 font-inter font-medium  leading-none tracking-normal text-xs shadow-sm h-4 w-42"
          optionItemClass="text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer"
          optionContainerClass="bg-white  shadow-md rounded-md mt-1"
        />

        <Select
          value={sortOrder}
          onChange={(val) => setSortOrder(val)}
          options={sortOptions}
          itemText="label"
          itemValue="value"
          showSelectAll={false}
          className="flex-none  rounded-md bg-gray-200 font-inter font-medium  leading-none tracking-normal text-xs shadow-sm h-4 w-42"
          optionItemClass="text-xs px-2 py-1 hover:bg-gray-100 cursor-pointer"
          optionContainerClass="bg-white border border-gray-300 shadow-md rounded-md mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredItems.map((item) => (
          <div key={item.date} className="w-full">
            <div className="w-full relative  rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={`History ${item.date}`}
                width={150}
                height={200}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="mt-2 flex justify-evenly items-center">
              <div>
                <p className="text-xs text-gray-500">{item.date}</p>
                <h3 className="text-sm font-semibold">{item.title}</h3>
              </div>
              <p className="text-xs text-gray-400">{item.source}</p>
              <Image
                src={item.view}
                alt={`Viewed ${item.date}`}
                width={17}
                height={17}
              />
              <Image
                src={item.icon}
                alt={`Bookmark ${item.date}`}
                width={17}
                height={17}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
