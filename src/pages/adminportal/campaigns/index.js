import React, { useState, useRef } from "react";
import { CiPause1, CiMedicalCross } from "react-icons/ci";
import { FaRegSquareCheck, FaSquarePlus } from "react-icons/fa6";
import CreateCampaignForm from "@/components/adminportal/adminsidebar/details/CreateCampaignForm";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { FaRunning } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { TiTickOutline } from "react-icons/ti";
import Pagination from "@/components/adminportal/adminsidebar/Pagination";
import Search from "@/components/adminportal/adminsidebar/Search";



export default function index() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const campaignsPerPage = 9;

  const campaignData = [
    {
      id: 1,
      creator: "Lucas Green",
      title: "Community, Pick",
      platform: "Telegram, Discord",
      community: "Biffines",
      duration: "14 days",
      votes: "2,245",
    },
    {
      id: 2,
      creator: "Sophia Miller",
      title: "Top Contributor",
      platform: "Slack, WhatsApp",
      community: "ByteTech",
      duration: "21 days",
      votes: "1,887",
    },
    {
      id: 3,
      creator: "Ethan Thompson",
      title: "Expert User",
      platform: "LinkedIn, Reddit",
      community: "ByteStream",
      duration: "30 days",
      votes: "3,456",
    },
    {
      id: 4,
      creator: "Aes Wilson",
      title: "Power User",
      platform: "Facebook, Twitter",
      community: "ByteAvail",
      duration: "7 days",
      votes: "4,321",
    },
    {
      id: 5,
      creator: "Mia Harris",
      title: "Super Fan",
      platform: "Instagram, Snapchat",
      community: "ByteWorks",
      duration: "45 days",
      votes: "5,678",
    },
    {
      id: 6,
      creator: "Noah Lee",
      title: "Beta Tester",
      platform: "Princess, TikTok",
      community: "ByteKit",
      duration: "10 days",
      votes: "6,789",
    },
    {
      id: 7,
      creator: "Emma Garcia",
      title: "Innovator",
      platform: "YouTube, Discord",
      community: "ByteHub",
      duration: "60 days",
      votes: "7,880",
    },
    {
      id: 8,
      creator: "William Martinez",
      title: "Early Adopter",
      platform: "WhatsApp, Telegram",
      community: "BytePad",
      duration: "3 days",
      votes: "8,901",
    },
    {
      id: 9,
      creator: "Olivia Phillips",
      title: "Trendsletter",
      platform: "Discord, Slack",
      community: "ByteNet",
      duration: "28 days",
      votes: "9,012",
    },
  ];

  const toggleCheckbox = (id) => {
    setSelectedCampaigns((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const toggleCalendarDropdown = () => {
    setShowCalendarDropdown(!showCalendarDropdown);
  };

  const toggleTierDropdown = () => {
    setShowTierDropdown(!showTierDropdown);
  };

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaignData.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );
  const totalPages = Math.ceil(campaignData.length / campaignsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (showCreateForm) {
    return <CreateCa    mpaignForm onBack={() => setShowCreateForm(false)} />;
  }
  return (
    <div className="lg:p-4"style={{
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
      <div className="mb-4 flex  justify-end">
        <button
          className="flex items-center gap-2 bg-bluebutton text-white px-4 py-2 rounded-md"
          onClick={() => setShowCreateForm(true)}
        >
          <FaSquarePlus />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <div className="flex flex-row bg-[#E0E0E070] border border-[#E0E0E0] p-4 rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <HiOutlineMegaphone />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Total</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
        <div className="flex flex-row  p-4 bg-[#E0E0E070] border border-[#E0E0E0] rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <FaRunning />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Active</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
        <div className="flex flex-row bg-[#E0E0E070] border border-[#E0E0E0] p-4 rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <CiPause1 />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Pause</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
        <div className="flex flex-row bg-[#E0E0E070] border border-[#E0E0E0] p-4 rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <CiMedicalCross className="rotate-45" />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Terminated</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
        <div className="flex flex-row bg-[#E0E0E070] border border-[#E0E0E0] p-4 rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <TiTickOutline />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Completed</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
        <div className="flex flex-row bg-[#E0E0E070] border border-[#E0E0E0] p-4 rounded-md shadow-sm gap-2">
          <div className="text-white bg-bluebutton rounded-full flex items-center p-3 text-3xl">
            <GiSandsOfTime />
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500">Pending</p>
            <p className="font-bold text-xl">34</p>
          </div>
        </div>
      </div>

     <Search/>
      <div className="w-full overflow-x-auto">
  <div className="min-w-[1000px]"> {/* Set minimum width to prevent wrapping */}
    <table className="w-full text-sm text-left">
      <thead className="text-gray-600 border-b font-normal">
        <tr>
          <th className="p-3 pl-4 w-8 whitespace-nowrap">
            <input
              type="checkbox"
              onChange={() => {
                if (selectedCampaigns.length === campaignData.length) {
                  setSelectedCampaigns([]);
                } else {
                  setSelectedCampaigns(
                    campaignData.map((campaign) => campaign.id)
                  );
                }
              }}
              checked={
                selectedCampaigns.length === campaignData.length &&
                campaignData.length > 0
              }
            />
          </th>
          <th className="p-3 whitespace-nowrap">Creator</th>
          <th className="p-3 whitespace-nowrap">Campaign title</th>
          <th className="p-3 whitespace-nowrap">Platform</th>
          <th className="p-3 whitespace-nowrap">Community</th>
          <th className="p-3 whitespace-nowrap">Duration</th>
          <th className="p-3 whitespace-nowrap">Votes</th>
        </tr>
      </thead>
      <tbody>
        {currentCampaigns.map((campaign) => (
          <tr key={campaign.id} className="border-b hover:bg-gray-50">
            <td className="p-3 pl-4 whitespace-nowrap">
              <input
                type="checkbox"
                checked={selectedCampaigns.includes(campaign.id)}
                onChange={() => toggleCheckbox(campaign.id)}
                className="accent-blue-500"
              />
            </td>
            <td className="p-3 font-medium whitespace-nowrap">{campaign.creator}</td>
            <td className="p-3 text-gray-700 whitespace-nowrap">{campaign.title}</td>
            <td className="p-3 text-gray-700 whitespace-nowrap">{campaign.platform}</td>
            <td className="p-3 text-gray-700 whitespace-nowrap">{campaign.community}</td>
            <td className="p-3 text-[#10B981] whitespace-nowrap">{campaign.duration}</td>
            <td className="p-3 text-gray-700 whitespace-nowrap">{campaign.votes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination - stays fixed width */}
  <div className="w-full overflow-x-auto mt-4">
    <div className="min-w-[300px]"> {/* Minimum width for pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={handlePageChange}
      />
    </div>
  </div>
</div>
    </div>
  );
}
