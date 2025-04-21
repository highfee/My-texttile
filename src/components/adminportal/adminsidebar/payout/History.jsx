import React, { useState } from "react";
import { GoArrowDownLeft } from "react-icons/go";

const history = [
  {
    title: "Webibly collection, 2 item purchase",
    date: "Today, Jan 18, 2025 10:23 AM",
    amount: "$65.76",
  },
  {
    title: "Vintage design pack, 1 item purchase",
    date: "Wednesday, Jan 15, 2025 4:55 PM",
    amount: "$24.99",
  },
  {
    title: "Vintage design pack, 1 item purchase",
    date: "Friday, Jan 05, 2025 11:54 AM",
    amount: "$24.99",
  },
  {
    title: "Modern UI Kit, 5 item purchase",
    date: "Monday, Jan 2, 2025 2:00 PM",
    amount: "$120.45",
  },
  {
    title: "Creative font bundle, 2 item purchase",
    date: "Wednesday, Jan 5, 2025 4:55 PM",
    amount: "$35.99",
  },
];

export default function History() {
  const [showAll, setShowAll] = useState(false);
  
  // Determine which history items to show based on showAll state
  const visibleHistory = showAll ? history : history.slice(0, 3);

  return (
    <div>
      <div className="border bg-white mt-4 rounded-md overflow-x-auto">
        <div className="flex justify-between items-center px-4 py-2 border-b min-w-[600px]">
          <span className="text-xs text-gray-500">History</span>
          <button 
            className="text-xs text-blue-500 cursor-pointer"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View less ▴' : 'View more ▾'}
          </button>
        </div>
        <div className="min-w-[600px]">
          {visibleHistory.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-t"
            >
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <div className="text-[#10B981] text-xl rounded-full p-2 bg-[#F0F3F4]">
                  <GoArrowDownLeft />
                </div>
                <div>
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
              </div>
              <div className="text-sm font-medium">{entry.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}