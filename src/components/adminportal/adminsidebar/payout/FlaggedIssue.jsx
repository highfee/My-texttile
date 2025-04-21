import React, { useState } from "react";
import { CiMedicalCross } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";

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
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
  },
  {
    name: "Noah Lee",
    tier: "Tier 1",
    balance: "$237",
    amount: "$100",
    duration: "8 days",
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
      className={`flex items-center px-4 py-2 cursor-pointer transition min-w-[1000px]  border-b ${
        isSelected ? "bg-bluebutton text-white" : ""
      }`}
    >
      <div className="w-1/5 flex items-center gap-2 py-2 ">
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

export default function FlaggedIssue() {
  const [selectedFlaggedIndex, setSelectedFlaggedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Determine which requests to show based on showAll state
  const visibleRequests = showAll ? requests : requests.slice(0, 4);

  return (
    <div className="bg-white  overflow-x-auto">
      <div className="flex justify-between items-center px-4 py-2">
        <span className="text-xs text-gray-500">
          Flagged withdrawal request
        </span>
        <button 
          className="text-xs text-blue-500 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'View less ▴' : 'View more ▾'}
        </button>
      </div>
      <div className="border rounded-md overflow-x-auto">
        <div className="px-4 pt-2 text-md text-gray-500 font-medium flex border-b py-2 min-w-[600px]">
          <div className="w-1/5">Creator</div>
          <div className="w-1/5">Tier</div>
          <div className="w-1/5">SBalance</div>
          <div className="w-1/5">Req. Amount</div>
          <div className="w-1/5">Duration</div>
        </div>
        <div className="min-w-[600px] ">
          {visibleRequests.map((item, index) => (
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
  );
}