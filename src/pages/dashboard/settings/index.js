import { useState } from "react";
import Account from "@/components/dashboard/sidebarcomponents/Settings/Account";
import PayoutSettings from "@/components/dashboard/sidebarcomponents/Settings/PayoutSettings";
import AppearanceSettings from "@/components/dashboard/sidebarcomponents/Settings/AppearanceSettings";
import SubscriptionPlans from "@/components/dashboard/sidebarcomponents/Settings/SubscriptionPlans";
import Notification from "@/components/adminportal/Layout/Notification";
import Security from "@/components/dashboard/sidebarcomponents/Settings/Security";
import Integrations from "@/components/dashboard/sidebarcomponents/Settings/Integrations";

const index = () => {
    const tabs = ["Account", "Security", "Appearance", "Notification", "Payout", "Integrations", "Subscription"];
    const [activeTab, setActiveTab] = useState("Account");

    return (
      <div className="px-1 lg:px-10">
        <h2 className="text-2xl font-bold pb-4">Settings</h2>
        <div className="w-full overflow-x-auto py-4">
          <div className="flex space-x-4 bg-white rounded-lg shadow-md w-max md:w-fit whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab ? "bg-blue-100 text-bluebutton font-semibold":"text-graycolor "
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className=" ">
          {activeTab === "Account" && <Account />}
          {activeTab === "Payout" && <PayoutSettings/> }
          {activeTab === "Appearance" && <AppearanceSettings/> }
          {activeTab === "Subscription" && <SubscriptionPlans/> }
          {activeTab === "Notification" && <Notification/> }
          {activeTab === "Security" && <Security/> }
          {activeTab === "Integrations" && <Integrations/> }
          
        </div>
      </div>
    );
};

export default index;
