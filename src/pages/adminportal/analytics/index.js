import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoMdSwitch } from "react-icons/io";
import { BsSortDown } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import {
  creators,
  monetaryData,
  ordersData,
  referralsData,
  statCards,
  timeFilters,
} from "@/data/adminData/analyticsData";

export default function AnalyticsPage() {
  const [showMonetaryDropdown, setShowMonetaryDropdown] = useState(false);
  const [selectedMonetaryOption, setSelectedMonetaryOption] = useState("Payout");
  const monetaryOptions = ["Sales", "Orders", "Referral Earning", "Payout"];

  return (
    <div className="p-2 md:p-6 space-y-6 min-h-screen"style={{
        overflowY: "auto",
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-md shadow text-xs md:text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm border w-full md:w-auto justify-center">
            <HiDownload size={14} />
            Export
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm border w-full md:w-auto justify-center">
            <IoMdSwitch className="text-lg md:text-xl" />
            Filter
            <IoIosArrowDown />
          </button>
        </div>
      </div>

      {/* Stats and Orders Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-2/3 bg-white rounded-lg p-3 md:p-6 shadow">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className="border border-[#3A3A3A3D] rounded-md gap-2 p-3 md:p-4 shadow flex flex-col items-start"
            >
              <div className="flex justify-between items-center w-full">
                <p className="text-xs md:text-sm text-gray-500">{stat.title}</p>
                <span
                  className={`p-1 rounded-full text-xs md:text-sm text-center flex flex-row items-center gap-1 ${stat.color} ${stat.background}`}
                >
                  {stat.change}
                  <FaArrowTrendUp size={12} />
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold mt-1 md:mt-2">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg p-3 md:p-4 shadow flex flex-col w-full lg:w-1/3">
          <h3 className="text-xs md:text-sm font-medium mb-3 md:mb-4">Orders</h3>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
            12,435 Total Orders
          </p>
        </div>
      </div>

      {/* Monetary Report and Referrals Section */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Monetary Report with responsive buttons */}
        <div className="bg-white rounded-lg p-3 md:p-4 shadow flex flex-col w-full lg:w-2/3">
          <div className="flex flex-row md:items-center justify-between gap-2 mb-3 md:mb-4">
            <h3 className="text-xs md:text-sm font-medium">Monetary Report</h3>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-row items-center gap-2">
              {monetaryOptions.map((option) => (
                <button
                  key={option}
                  className={`border px-2 py-1 rounded-md text-xs ${
                    selectedMonetaryOption === option
                      ? "border-bluebutton text-bluebutton bg-blue-50"
                      : "border-[#3A3A3A3D] text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedMonetaryOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {/* Mobile Dropdown - Aligned to the left */}
            <div className="md:hidden relative">
              <button
                className="border border-[#3A3A3A3D] px-2 py-1 rounded-md text-xs flex items-center gap-1"
                onClick={() => setShowMonetaryDropdown(!showMonetaryDropdown)}
              >
                {selectedMonetaryOption}
                <IoIosArrowDown
                  className={`transition-transform duration-200 ${
                    showMonetaryDropdown ? "rotate-180" : ""
                  }`}
                  size={12}
                />
              </button>
              
              {showMonetaryDropdown && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-24">
                  {monetaryOptions.map((option) => (
                    <button
                      key={option}
                      className={`block w-full text-left px-2 py-2 text-xs hover:bg-gray-100 ${
                        selectedMonetaryOption === option
                          ? "bg-blue-50 text-bluebutton"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedMonetaryOption(option);
                        setShowMonetaryDropdown(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monetaryData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
            $42,875 Total Payout
          </p>
        </div>

        {/* Referrals Section */}
        <div className="bg-white rounded-lg p-3 md:p-4 shadow flex flex-col w-full lg:w-1/3">
          <h3 className="text-xs md:text-sm font-medium mb-3 md:mb-4">
            Referrals
          </h3>
          <div className="h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referralsData}>
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="referrals"
                  fill="#f43f5e"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
            6,435 Total Referrals
          </p>
        </div>
      </div>

      {/* Creators Table Section */}
      <div className="bg-white rounded-lg p-3 md:p-4 shadow overflow-hidden">
        <div className="flex flex-row justify-between items-start md:items-center mb-4 gap-3">
          <p className="text-base md:text-lg font-semibold">Creators</p>
          <p className="text-xs md:text-sm text-bluebutton cursor-pointer">
            View More
          </p>
        </div>

        <div className="flex flex-row items-start md:items-center justify-between mb-4 gap-3">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full border p-2 pl-9 rounded-full text-xs md:text-sm bg-[#F7F8FA] focus:outline-none"
            />
          </div>
          <div className="flex flex-row items-center gap-1 md:hidden opacity-70 border p-1">
            <FaRegSquareCheck />
            <p>Action</p>
            <IoIosArrowDown size={14} />
          </div>

          <div className="hidden md:flex gap-2 w-full md:w-auto overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs opacity-70 border whitespace-nowrap">
                <HiDownload size={14} />
                Export
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs opacity-70 border whitespace-nowrap">
                <BsSortDown size={14} />
                Sort
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs opacity-70 border whitespace-nowrap">
                <IoMdSwitch className="text-lg" />
                Filter
                <IoIosArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm min-w-[800px]">
            <thead className="text-left bg-gray-50">
              <tr>
                <th className="p-2 md:p-3">Name</th>
                <th className="p-2 md:p-3">Item Sold</th>
                <th className="p-2 md:p-3">Revenue</th>
                <th className="p-2 md:p-3">Current Linking</th>
                <th className="p-2 md:p-3">Status</th>
                <th className="p-2 md:p-3">Tier</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2 md:p-3 flex flex-row gap-2 items-center">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {creator.name}
                  </td>
                  <td className="p-2 md:p-3">{creator.items}</td>
                  <td className="p-2 md:p-3">{creator.revenue}</td>
                  <td className="p-2 md:p-3">{creator.links}</td>
                  <td className="p-2 md:p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        creator.status === "Active"
                          ? "text-green-500 bg-green-50"
                          : "text-pink-500 bg-pink-50"
                      }`}
                    >
                      {creator.status}
                    </span>
                  </td>
                  <td className="p-2 md:p-3">{creator.tier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}