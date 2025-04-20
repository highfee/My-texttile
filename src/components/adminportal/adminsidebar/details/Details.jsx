import React, { useState, useRef, useEffect } from "react";
import Transactions from "./Transactions";
import AdminCampaign from "./AdminCampaign";
import { MdDeleteOutline, MdOutlineFileDownload } from "react-icons/md";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";
import Overview from "./Overview";

const Details = ({ creator, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleActionDropdown = (e) => {
    e.stopPropagation();
    setShowActionDropdown(!showActionDropdown);
  };

  const handleDeleteClick = () => {
    setShowActionDropdown(false);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    // Add your delete logic here
    console.log("Account deleted");
    setShowDeleteModal(false);
    onClose(); // Close the details view after deletion
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDownloadCSV = () => {
    // Add your CSV download logic here
    console.log("Downloading CSV...");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ActionDropdown = () => {
    return (
      <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-md z-20 w-48">
        <ul className="py-2">
          <li
            className="flex items-center px-4 py-2 text-graycolor hover:bg-gray-100 cursor-pointer"
            onClick={handleDeleteClick}
          >
            <MdDeleteOutline className="mr-2" />
            <span>Reset Password</span>
          </li>
          <li className="flex items-center px-4 py-2 text-graycolor hover:bg-gray-100 cursor-pointer">
            <CiPlay1 className="mr-2" />
            <span>Reactivate Account</span>
          </li>
          <li className="flex items-center px-4 py-2 text-graycolor hover:bg-gray-100 cursor-pointer">
            <IoRocketOutline className="mr-2" />
            <span>Upgrade Tier</span>
          </li>
          <li className="flex items-center px-4 py-2 text-graycolor hover:bg-gray-100 cursor-pointer">
            <MdOutlineReportProblem className="mr-2" />
            <span>Flag Account</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xs w-full text-center">
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 text-graycolor mb-1">
                <MdDeleteOutline className="text-xl " />
                <h3 className="text-lg font-semibold ">Warning</h3>
              </div>
              <p className="text-[#FF5789E5] font-semibold">
                Action cannot be reversed, proceed?
              </p>
            </div>

            {/* Centered buttons with gap */}
            <div className="flex justify-center gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-[#FF5789E5] border border-[#FF5789E5] rounded-md bg-[#FF578926] font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-600 rounded-md p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="bg-[#DCE7F233] rounded-md px-4 py-2">
            <p className="text-xs opacity-70">Total Sales</p>
            <h3 className="font-semibold">$2,900</h3>
          </div>
          <div className="bg-[#DCE7F233] rounded-md px-4 py-2">
            <p className="text-xs opacity-70">Total Payout</p>
            <h3 className="font-semibold">$900</h3>
          </div>
          <div className="bg-[#DCE7F233] rounded-md px-4 py-2">
            <p className="text-xs opacity-70">Total Referrals</p>
            <h3 className="font-semibold">34</h3>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Show different buttons based on active tab */}
          {activeTab === "overview" ? (
            <>
              <button
                className="flex items-center bg-[#FF5789] text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors"
                onClick={handleDeleteClick}
              >
                <MdDeleteOutline className="text-xl" /> Delete Account
              </button>
              <button className="flex items-center bg-bluebutton border border-[#DCE7F2] text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors">
                <CiPause1 className="text-xl" /> Suspend Account
              </button>
            </>
          ) : (
            <button
              className="flex items-center bg-bluebutton border border-[#DCE7F2] text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors"
              onClick={handleDownloadCSV}
            >
              <MdOutlineFileDownload className="text-xl mr-1" /> Download CSV
            </button>
          )}
          
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              className="flex items-center border border-[#DCE7F2] text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors"
              onClick={toggleActionDropdown}
            >
              <BsThreeDots className="text-xl"/>
            </button>
            {showActionDropdown && <ActionDropdown />}
          </div>
        </div>
      </div>

      <div className="lg:p-2">
        <nav className="flex flex-wrap lg:gap-2">
          <button
            onClick={() => handleTabClick("overview")}
            className={`px-2 py-2 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "overview"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabClick("transactions")}
            className={`px-2 py-2 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "transactions"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Earnings/Transaction History
          </button>
          <button
            onClick={() => handleTabClick("campaign")}
            className={`px-2 py-2 rounded-md text-sm font-semibold transition-colors ${
              activeTab === "campaign"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Campaign
          </button>
        </nav>
      </div>

      <div className="min-h-[300px]">
        {activeTab === "overview" && <Overview creator={creator} />}
        {activeTab === "transactions" && <Transactions creator={creator} />}
        {activeTab === "campaign" && <AdminCampaign creator={creator} />}
      </div>
    </div>
  );
};

export default Details;