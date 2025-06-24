import React, { useState } from "react";
import All from "@/components/adminportal/adminsidebar/payout/All";
import FlaggedIssue from "@/components/adminportal/adminsidebar/payout/FlaggedIssue";
import Pendingrequests from "@/components/adminportal/adminsidebar/payout/Pendingrequests";
import History from "@/components/adminportal/adminsidebar/payout/History";
import Search from "@/components/adminportal/adminsidebar/Search";
const index = () => {
  const [activeTab, setActiveTab] = useState("All");

  const renderContent = () => {
    switch (activeTab) {
      case "All":
        return <All/> ;
      case "Pending":
        return <Pendingrequests/> ;
      case "History":
        return <History/> ;
      case "FlaggedIssue":
        return <FlaggedIssue/> ;
      default:
        return null;
    }
  };
  return (
    <div className=""style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      <div className="bg-bluebutton text-white p-4 flex items-center justify-between rounded-lg">
        <div className="flex gap-4">
          <div className="bg-[#DCE7F233] p-3 rounded-md">
            <p className="text-xs lg:text-sm">Total Payout</p>
            <p className="text-xl font-semibold">$27,900</p>
          </div>
          <div className="bg-[#DCE7F233] p-3 rounded-md">
            <p className="text-xs lg:text-sm">Unsuccessful</p>
            <p className="text-xl font-semibold">20</p>
          </div>
          <div className="bg-[#DCE7F233] p-2 lg:p-3 rounded-md">
            <p className="text-xs lg:text-sm">Total Referrals Payout</p>
            <p className="text-xl font-semibold">$2340</p>
          </div>
        </div>
        <button className="hidden lg:flex border border-white px-3 py-1 rounded items-center">. . .</button>
      </div>
      <div className=" flex gap-1 lg:gap-2 p-1 ">
        {["All", "Pending", "History", "FlaggedIssue"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={` px-2 lg:px-4 py-1 rounded-full font-medium ${
              activeTab === tab
                ? " text-bluebutton"
                : "text-gray-600 "
            }`}
          >
            {tab}
            {tab === "FlaggedIssue" && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                20
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="bg-white"><Search/>{renderContent()}</div>
    </div>
  );
};
export default index;
