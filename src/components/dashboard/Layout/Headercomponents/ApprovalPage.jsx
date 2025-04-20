import { ArrowLeft } from "lucide-react";
import { LuSquareArrowDown, LuSquareArrowUp } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { Share2 } from "lucide-react";
export function ApprovalPage({ submission, onBack }) {
  const campaignData = {
    active: [
      {
        id: 1,
        title: "Campaign Title",
        duration: "14days",
        endDate: "2010 Jan. 2005",
        votes: 12,
        participants: 0,
        community: "Roburna",
        platform: "Telegram",
        image: "/dashboard/campaign/cardimg2.png",
      },
      {
        id: 2,
        title: "Campaign Title",
        duration: "14days",
        endDate: "2010 Jan. 2005",
        votes: 12,
        participants: 0,
        community: "Roburna",
        platform: "Telegram",
        image: "/dashboard/campaign/cardimg2.png",
      },
      {
        id: 3,
        title: "Campaign Title",
        duration: "14days",
        endDate: "2010 Jan. 2005",
        votes: 12,
        participants: 0,
        community: "Roburna",
        platform: "Telegram",
        image: "/dashboard/campaign/cardimg2.png",
      },
      {
        id: 4,
        title: "Campaign Title",
        duration: "14days",
        endDate: "2010 Jan. 2005",
        votes: 12,
        participants: 0,
        community: "Roburna",
        platform: "Telegram",
        image: "/dashboard/campaign/cardimg2.png",
      },
    ],
  };
  const activeTab = "active";
  return (
    <div className=" lg:p-6">
      <div className="flex items-center mb-8">
        <button
           onClick={onBack}
          className="text-gray-700 hover:text-gray-900 flex items-center">
          <ArrowLeft size={20} className="mr-2"/>
          Back
        </button>
      </div>
      <div className="mb-8 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <p className="text-lg lg:text-2xl font-bold">WRITER EDITION COLLECTION</p>
          <p className="font-semibold text-xl px-3 py-1">
            Financial $50 Gift card
          </p>
        </div>
        <div className="py-2">
          <img
            src="/dashboard/campaign/approval.jpg"
            className="w-full object-cover h-[215px]"
          />
        </div>
        <p className="text-[#121212CC] text-sm lg:text-lg font-semibold mb-6">
          Join our exciting Print on Demand design campaign! We invite our
          creative community to contribute their unique designs for our upcoming
          print collection. This is your chance to showcase your talent and have
          your artwork featured on our products. Share your designs with us and
          be part of a collaborative effort to create something special
          together. Let's make this collection a true reflection of our
          community's creativity!
        </p>
        <div className="border-t border-gray-200 my-6"></div>
      </div>
      <h2 className="text-lg lg:text-2xl font-bold mb-6 text-center">
        VOTE FOR YOUR PROJECTS ENTRIES
      </h2>
      <div className="flex flex-col gap-4 mt-6 lg:px-20">
        {campaignData[activeTab].length > 0 ? (
          campaignData[activeTab].map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <p className="text-xs text-graycolor px-2 ">
                    End{" "}
                    <span className="opacity-[0.44] gap-x-4">{campaign.endDate}</span>{" "}
                  </p>
                </div>
                <button className="flex items-center gap-1 bg-blue-50 p-2 border border-[#016FDE33] rounded-md text-graycolor text-sm">
                  234 Total Votes
                </button>
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                  {campaign.image && (
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="rounded-lg w-32 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-bluebutton text-white">
                    <span className="text-sm">{campaign.votes} </span>
                    <LuSquareArrowUp className="text-lg" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-bluebutton text-white">
                    <span className="text-sm">{campaign.participants}</span>
                    <LuSquareArrowDown className="text-lg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-500 pt-2 ">
                <p>
                  <span className="font-semibold text-graycolor">
                    Community:
                  </span>{" "}
                  {campaign.community}
                </p>
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
