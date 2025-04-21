import { useState } from "react";
import { Share2 } from "lucide-react";
import { FiUsers } from "react-icons/fi";
import { LuSquareArrowUp } from "react-icons/lu";

export function CampaignCards({ onCardClick }) {
  const [activeTab, setActiveTab] = useState("Active");

  const campaignData = {
    Active: [
      {
        id: "1",
        title: "Summer Promotion",
        votes: "234",
        participants: "2,345",
        community: "Robuma",
        platform: "Telegram",
        duration: "14 days",
        endDate: "24th Jan. 2025",
        image: "/dashboard/campaign/cardimg.png",
      },
      {
        id: "2",
        title: "Product Launch",
        votes: "189",
        participants: "1,876",
        community: "Robuma",
        platform: "Discord",
        duration: "10 days",
        endDate: "30th Jan. 2025",
        image: "/dashboard/campaign/cardimg2.png",
      },
    ],
    Completed: [
      {
        id: "3",
        title: "Winter Sale",
        votes: "500",
        participants: "3,200",
        community: "Robuma",
        platform: "Telegram",
        duration: "30 days",
        endDate: "15th Dec. 2024",
      },
    ],
    Cancelled: [
      {
        id: "4",
        title: "Spring Event",
        votes: "120",
        participants: "890",
        community: "Robuma",
        platform: "Twitter",
        duration: "7 days",
        endDate: "5th Nov. 2024",
      },
    ],
  };

  const tabs = ["Active", "Completed", "Cancelled"];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Campaigns</h2>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 text-sm rounded-md ${
                activeTab === tab
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {campaignData[activeTab].length > 0 ? (
          campaignData[activeTab].map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onCardClick(campaign)}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <p className="text-xs text-gray-500">Duration {campaign.duration}</p>
                  <p className="text-xs text-gray-500">End {campaign.endDate}</p>
                </div>
                <button 
                  className="flex items-center gap-1 bg-blue-500 p-2 rounded-md text-white text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="w-3 h-3" />
                  Share Link
                </button>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                  {campaign.image && (
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="rounded-lg w-16 h-16 object-cover" 
                    />
                  )}
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-graycolor">
                    <LuSquareArrowUp className="text-lg" />
                    <span className="text-sm">{campaign.votes} Votes</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-graycolor">
                    <FiUsers className="text-lg" />
                    <span className="text-sm">{campaign.participants} Participants</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
                <p><span className="font-semibold text-gray-700">Community:</span> {campaign.community}</p>
                <p><span className="font-semibold text-gray-700">Platform:</span> {campaign.platform}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No {activeTab.toLowerCase()} campaigns found
          </div>
        )}
      </div>
    </div>
  );
}