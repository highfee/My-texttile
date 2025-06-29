"use client";

import { useState } from "react";
import FAQ from "@/components/dashboard/sidebarcomponents/HelpCenter/FAQ";
// import Payout from '@/components/dashboard/sidebarcomponents/Payout';
import GettingStarted from "@/components/dashboard/sidebarcomponents/HelpCenter/GettingStarted";
import Marketing from "@/components/dashboard/sidebarcomponents/HelpCenter/Marketing";
import Store from "@/components/dashboard/sidebarcomponents/HelpCenter/Store";

const index = () => {
  const [activeTab, setActiveTab] = useState("FAQs");

  const tabs = ["FAQs", "Getting Started", "Payout", "Store", "Marketing"];

  return (
    <div className=" lg:px-16">
      <div className="flex space-x-4 sm:space-x-6 pb-2 overflow-x-auto justify-center sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap text-sm sm:text-lg font-medium ${
              activeTab === tab ? "text-black font-bold" : "text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "FAQs" && <FAQ />}
        {activeTab === "Getting Started" && <GettingStarted />}
        {/* {activeTab === 'Payout' && <Payout />} */}
        {activeTab === "Store" && <Store />}
        {activeTab === "Marketing" && <Marketing />}
      </div>
    </div>
  );
};

export default index;
