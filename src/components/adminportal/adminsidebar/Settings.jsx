import React, { useState } from "react";
import SubscriptionTiers from "./settings/SubscriptionTiers";
import Campaignsettings from "./settings/Campaignsettings";
import Payments from "./settings/Payments";
import Support from "./settings/Support";
import General from "./settings/General";

const tabs = [
  { key: "general", label: "General" },
  { key: "subscription", label: "Subscription & Tiers" },
  { key: "campaign", label: "Campaign" },
  { key: "payments", label: "Payments" },
  { key: "support", label: "Support" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderTab = () => {
    switch (activeTab) {
      case "subscription":
        return <SubscriptionTiers/> ;
      case "campaign":
        return <Campaignsettings/>;
      case "payments":
        return <Payments/>;
      case "support":
        return <Support/>;
      default:
        return <General/>;
    }
  };

  return (
    <div className="lg:p-6 space-y-4 min-h-screen"style={{
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
    {/* Horizontal scroll container */}
    <div className="overflow-x-auto">
      <div className="flex gap-4 bg-bluebutton p-1 rounded-md w-max lg:w-fit whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`lg:px-4 py-2 rounded-md ${
              activeTab === tab.key
                ? 'bg-bluebutton text-white'
                : 'text-white opacity-[0.55]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  
    <div className="bg-white p-4 rounded-md shadow">{renderTab()}</div>
  </div>
  
  );
};

export default Settings;
