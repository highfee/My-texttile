import React, { useState } from "react";
import { CiMedicalCross } from "react-icons/ci";
import { GoArrowDownLeft } from "react-icons/go";
import { TiTickOutline } from "react-icons/ti";

const All = () => {
  const [selectedPendingIndex, setSelectedPendingIndex] = useState(null);
  const [selectedFlaggedIndex, setSelectedFlaggedIndex] = useState(null);

  const requests = [
    {
      name: "Noah Lee",
      tier: "Tier 2",
      balance: "$120",
      amount: "$114",
      duration: "—",
    },
    {
      name: "Noah Lee",
      tier: "Tier 1",
      balance: "$345",
      amount: "$234",
      duration: "7 days",
    },
    {
      name: "Noah Lee",
      tier: "Tier 4",
      balance: "$2,345",
      amount: "$1278",
      duration: "24 hours",
    },
    {
      name: "Noah Lee",
      tier: "Tier 1",
      balance: "$237",
      amount: "$100",
      duration: "8 days",
    },
  ];

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

  const RequestRow = ({
    item,
    isFlagged,
    index,
    selectedIndex,
    setSelectedIndex,
  }) => {
    const isSelected = selectedIndex === index;

    return (
      <div
        onClick={() => setSelectedIndex(index)}
        className={`flex items-center px-4 py-2 cursor-pointer transition min-w-[1000px] ${
          isSelected ? "bg-bluebutton text-white" : ""
        }`}
      >
        <div className="w-1/5 flex items-center gap-2">
          <input type="checkbox" className="accent-blue-500" />
          <img
            src="/dashboard/purchaseicon.png"
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          <span>{item.name}</span>
        </div>
        <div className="w-1/5">{item.tier}</div>
        <div className="w-1/5">{item.balance}</div>
        <div className="w-1/5">{item.amount}</div>
        <div className="w-1/5 flex gap-2 items-center">
          {isSelected ? (
            <div className="flex flex-row gap-x-2">
              {isFlagged ? (
                <>
                  <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded flex items-center gap-1">
                    <TiTickOutline /> Unflagged
                  </button>
                  <button className="bg-[#FF5789] text-white px-3 py-1 text-sm rounded flex items-center gap-1">
                    <CiMedicalCross className="rotate-45" /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 text-sm rounded flex items-center gap-1">
                    <TiTickOutline /> Approve
                  </button>
                  <button className="bg-[#FF5789] text-white px-3 py-1 text-sm rounded flex items-center gap-1">
                    <CiMedicalCross className="rotate-45" /> Cancel
                  </button>
                </>
              )}
            </div>
          ) : (
            <span className="text-green-500 text-sm">{item.duration}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="text-sm text-gray-700 w-full space-y-8">
      {/* Pending Section */}
      <div className="bg-white overflow-hidden">
        <div className="flex justify-between items-center text-md px-4 py-2">
          <span className="opacity-[0.88]">Pending withdrawal request</span>
          <span className="text-bluebutton cursor-pointer">View more ▾</span>
        </div>
        <div className="border rounded-md overflow-x-auto">
          <div className="px-4 text-md text-gray-500 font-medium flex border-b py-2 min-w-[600px]">
            <div className="w-1/5">Creator</div>
            <div className="w-1/5">Tier</div>
            <div className="w-1/5">SBalance</div>
            <div className="w-1/5">Req. Amount</div>
            <div className="w-1/5">Duration</div>
          </div>
          <div className="min-w-[600px]">
            {requests.map((item, index) => (
              <RequestRow
                key={index}
                item={item}
                index={index}
                selectedIndex={selectedPendingIndex}
                setSelectedIndex={setSelectedPendingIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Flagged Section */}
      <div className="bg-white overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs text-gray-500">
            Flagged withdrawal request
          </span>
          <span className="text-xs text-blue-500 cursor-pointer">
            View more ▾
          </span>
        </div>
        <div className="border rounded-md overflow-x-auto">
          <div className="px-4 pt-2 text-md text-gray-500 font-medium flex border-b py-2 min-w-[600px]">
            <div className="w-1/5">Creator</div>
            <div className="w-1/5">Tier</div>
            <div className="w-1/5">SBalance</div>
            <div className="w-1/5">Req. Amount</div>
            <div className="w-1/5">Duration</div>
          </div>
          <div className="min-w-[600px]">
            {requests.map((item, index) => (
              <RequestRow
                key={`flag-${index}`}
                item={item}
                index={index}
                isFlagged
                selectedIndex={selectedFlaggedIndex}
                setSelectedIndex={setSelectedFlaggedIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="border bg-white mt-4 rounded-md overflow-x-auto">
        <div className="flex justify-between items-center px-4 py-2 border-b min-w-[600px]">
          <span className="text-xs text-gray-500">History</span>
          <span className="text-xs text-blue-500 cursor-pointer">
            View more ▾
          </span>
        </div>
        <div className="min-w-[600px]">
          {history.map((entry, i) => (
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
};

export default All;