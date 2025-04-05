import { Share2 } from "lucide-react";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { LuSquareArrowUp } from "react-icons/lu";

export function CampaignCards() {
  const [activeTab, setActiveTab] = useState("Active");

  const campaignData = {
    Active: [
      {
        title: "Campaign Title",
        votes: "234",
        participants: "2,345",
        community: "Robuma",
        platform: "Telegram",
        duration: "14 days",
        endDate: "24th Jan. 2025",
        image: "/dashboard/campaign/cardimg.png",
      },
      {
        title: "Campaign Title",
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
        title: "Completed Campaign",
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
        title: "Cancelled Campaign ",
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
    <div className="bg-white p-2 lg:p-6 rounded-lg shadow">
      <div className="flex lg:flex-row flex-col justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Campaigns</h2>
        <div className="flex gap-4">
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

      <div className="flex flex-col gap-4">
        {campaignData[activeTab] && campaignData[activeTab].length > 0 ? (
          campaignData[activeTab].map((campaign, index) => (
            <div
              key={index}
              className="bg-white p-1 lg:p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-row gap-x-4">
                  <p className="text-xs text-gray-500">
                    Duration {campaign.duration}
                  </p>
                  <p className="text-xs text-gray-500">
                    End {campaign.endDate}
                  </p>
                </div>
                <button className="flex items-center gap-1 bg-bluebutton p-2 rounded-md text-white text-xs">
                  <Share2 className="w-3 h-3" />
                  Share Link
                </button>
              </div>

              <div className="mb-4 flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={campaign.image} className="rounded-lg  " />
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                </div>
                <div className="flex gap-4">
                  <p className="text-sm px-2 py-2 rounded-md flex flex-row gap-x-2 bg-[#016FDE1A] ">
                    {campaign.votes} Votes <LuSquareArrowUp className=" items-baseline text-xl" />

                  </p>
                  <p className="text-sm px-2 py-2 rounded-md flex flex-row gap-x-2 bg-[#016FDE1A]">
                    {campaign.participants} Participants <FiUsers className=" items-baseline text-xl" />
                  </p>
                </div>
              </div>

              <div className="flex text-sm text-gray-500">
                <p className="mr-auto"><span className="text-graycolor font-semibold">Community:</span>  {campaign.community}</p>
                <p><span className="text-graycolor font-semibold">Platform:</span>  {campaign.platform}</p>
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
