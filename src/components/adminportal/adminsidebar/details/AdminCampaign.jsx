import React, { useState, useRef } from "react";
import { TiTickOutline } from "react-icons/ti";
import { CiMedicalCross } from "react-icons/ci";
import Search from "../Search";

const campaignData = [
  {
    id: 1,
    title: "Summer Sale Campaign",
    platform: "Instagram",
    community: "Fashion Lovers",
    duration: "Pending",
    votes: 1200,
    status: "approve",
  },
  {
    id: 2,
    title: "Winter Promotion Campaign",
    platform: "Facebook",
    community: "Tech Enthusiasts",
    duration: "Paused",
    votes: 980,
    status: "restart",
  },
  {
    id: 3,
    title: "Back-to-School Campaign",
    platform: "Twitter",
    community: "Students",
    duration: "Completed",
    votes: 750,
    status: "approve-disabled",
  },
];

const AdminCampaign = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(null);

  const calendarDropdownRef = useRef(null);
  const tierDropdownRef = useRef(null);
  const actionDropdownRef = useRef(null);

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
  const getStatusColor = (duration) => {
    switch (duration.toLowerCase()) {
      case "pending":
        return "text-yellow-500";
      case "paused":
        return "text-red-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <div className="lg:p-4">
      <Search/>

      <div className="w-full overflow-x-auto">
        <table className="w-max min-w-full text-sm text-left whitespace-nowrap rounded-md shadow-sm bg-white">
          <thead className="bg-gray-100 border-b text-gray-600">
            <tr>
              <th className="p-3 pl-4">
                <input type="checkbox" disabled />
              </th>
              <th className="p-3">Campaign title</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Community</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Votes</th>
              <th className="p-3 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {campaignData.map((campaign) => (
              <tr key={campaign.id} className="border-b hover:bg-gray-50">
                <td className="p-3 pl-4">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => toggleCheckbox(campaign.id)}
                    className="accent-blue-500"
                  />
                </td>
                <td className="p-3 font-medium">{campaign.title}</td>
                <td className="p-3 text-gray-700">{campaign.platform}</td>
                <td className="p-3 text-gray-700">{campaign.community}</td>
                <td className="p-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      campaign.duration
                    )}`}
                  >
                    {campaign.duration}
                  </span>
                </td>
                <td className="p-3 text-gray-700">{campaign.votes} votes</td>
                <td className="p-3 pr-4 flex items-center justify-end gap-2">
                  {(campaign.id === 1 || campaign.id === 3) && (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-md text-white text-xs font-semibold ${
                          campaign.status === "approve-disabled"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={campaign.status === "approve-disabled"}
                      >
                        <TiTickOutline className="text-white" />
                        Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs font-semibold">
                        <CiMedicalCross className="rotate-45" />
                        Pause
                      </button>
                    </>
                  )}

                  {campaign.id === 2 && (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-md text-white text-xs font-semibold ${
                          campaign.status === "approve-disabled"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        disabled={campaign.status === "approve-disabled"}
                      >
                        <TiTickOutline className="text-white" />
                        Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold">
                        <CiMedicalCross className="rotate-45" />
                        Restart
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCampaign;
