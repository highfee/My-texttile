import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiDollar } from "react-icons/bi";
import { HiDownload } from "react-icons/hi";
import { PiBankBold } from "react-icons/pi";
import { payoutData } from "@/data/adminData/userData/payout";
import WithdrawalModal from "@/components/dashboard/sidebarcomponents/WithdrawalModal";
import SuccessModal from "@/components/dashboard/sidebarcomponents/SuccessModal";

export default function index() {
  const [showHistory, setShowHistory] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dropdownOptions = [
    "Last 7 days",
    "Last 30 days",
    "This Month",
    "Custom Range",
  ];

  return (
    <div className="px-2 lg:px-10 gap-y-2">
      <h2 className="text-xl font-bold py-3">Payout</h2>

      {/* Current Payout Section */}
      <div className="bg-white p-2 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
          <div>
            <p className="text-lg font-bold py-2 text-graycolor">
              Current payout amount{" "}
              <span className="text-bluebutton">
                {payoutData.currentPayout}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              You currently don't have any profit.
            </p>
            <p className="text-xs text-gray-400">
              To add or update your payout information, please go to your
              Settings
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setShowWithdrawalModal(true)}
              className="bg-bluebutton text-white text-center px-4 py-2 rounded-lg flex items-center gap-2"
            >
              Withdraw <PiBankBold className="text-lg" />
            </button>

            {showWithdrawalModal && (
              <WithdrawalModal
                onClose={() => setShowWithdrawalModal(false)}
                onWithdraw={() => {
                  setShowWithdrawalModal(false);
                  setShowSuccessModal(true);
                }}
              />
            )}

            {showSuccessModal && (
              <SuccessModal onClose={() => setShowSuccessModal(false)} />
            )}

            <button className="border border-bluebutton text-center px-4 py-2 text-bluebutton rounded-lg flex items-center gap-2">
              Download CSV <HiDownload />
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white p-2 lg:p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between items-center relative">
          <div>
            <h3 className="font-semibold">Overview</h3>
            <p className="opacity-[0.44] text-sm">Your overall earnings</p>
          </div>

          <div className="relative">
            <button
              className="border px-4 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <AiOutlineCalendar /> Date Modified
              {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                {dropdownOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      // You can hook your filter logic here
                      setShowDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {payoutData.overview.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 lg:gap-4 p-1 lg:p-2 rounded-lg"
            >
              <div className={`p-2 text-xl ${item.bgColor} rounded-full`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-graycolor opacity-[0.44]">
                  {item.label}
                </p>
                <p className="text-sm lg:text-xl font-bold">
                  {item.value}{" "}
                  {item.change && (
                    <span className="text-green-500 text-xs font-thin">
                      {item.change}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">History</h3>
          <button
            className="px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>

        {showHistory && (
          <div className="whitespace-nowrap overflow-x-auto md:overflow-x-visible">
            <table className="w-full mt-4 text-left text-sm">
              <thead>
                <tr className="opacity-[0.44]">
                  <th className="py-3 px-3">Sale</th>
                  <th className="py-3 px-3">Fees</th>
                  <th className="py-3 px-3">Payout</th>
                  <th className="py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payoutData.history.map((item, index) => (
                  <tr key={index} className="text-graycolor">
                    <td className="py-3 flex items-center gap-3 px-3">
                      <div className="p-3 text-bluebutton bg-[#016FDE24] rounded-full">
                        <BiDollar />
                      </div>
                      {item.name}
                    </td>
                    <td className="py-3 px-3">{item.fees}</td>
                    <td className="py-3 px-3">{item.payout}</td>
                    <td className="py-3 px-3">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
