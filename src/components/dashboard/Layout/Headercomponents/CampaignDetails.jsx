import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { LuSquareArrowUp } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export function CampaignDetails({ campaign, onBack, onApproveClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState("Winter Edition");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const campaignData = {
    duration: "14days",
    end: "24th Jan",
    votes: 2345,
    participants: 2345,
    community: "Roburna",
    submissions: [
      {
        id: 1,
        author: "Kristin Williams",
        platform: "Telegram",
        votes: 1,
        image: "/dashboard/campaign/detail1.svg",
        text: "I just wanted to take a moment to share my appreciation for y...",
      },
      {
        id: 2,
        author: "Kristin Williams",
        platform: "Telegram",
        votes: 1,
        image: "/dashboard/campaign/detail2.svg",
        text: "I just wanted to take a moment to share my appreciation for y...",
      },
      {
        id: 3,
        author: "Kristin Williams",
        platform: "Telegram",
        votes: 1,
        image: "/dashboard/campaign/detail3.svg",
        text: "I just wanted to take a moment to share my appreciation for y...",
      },
      {
        id: 4,
        author: "Kristin Williams",
        platform: "Telegram",
        votes: 1,
        image: "/dashboard/campaign/detail1.svg",
        text: "I just wanted to take a moment to share my appreciation for y...",
      },
      {
        id: 5,
        author: "Kristin Williams",
        platform: "Telegram",
        votes: 1,
        image: "/dashboard/campaign/detail4.svg",
        text: "I just wanted to take a moment to share my appreciation for y...",
      },
    ],
  };

  const totalPages = 68;
  const pageNumbers = [1, 2, 3, "...", 67, 68];

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      {/* Header */}
      <div className="flex items-center">
        <button onClick={onBack} className="text-gray-700 hover:text-gray-900">
          <ArrowLeft size={20} />
        </button>

        <div className="relative ml-4">
          <button className="flex items-center border rounded px-3 py-2">
            <span className="mr-2">Campaign</span>
            <span className="font-medium">{selectedCampaign}</span>
            <IoIosArrowDown />
          </button>
        </div>

        <div className="relative">
          <button
            className="ml-2 text-gray-700 px-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <BsThreeDotsVertical />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 lg:left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                Pause Campaign
              </div>
              <div className="py-2 px-4 hover:bg-gray-100 cursor-pointer text-red-500">
                Delete Campaign
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Campaign Stats */}
      <div className="p-1 lg:p-4">
        <div className="md:flex md:justify-between md:items-center">
          <div className="order-1 md:order-2 flex flex-row gap-4 mb-4 md:mb-0">
            <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-graycolor">
              <LuSquareArrowUp className="text-lg" />
              <span className="text-sm">{campaignData.votes} Votes</span>
            </div>
            <div className="flex flex-row items-center gap-2 px-3 py-2 rounded-md bg-blue-50 text-graycolor">
              <FiUsers className="text-lg" />
              <span className="text-sm">
                {campaignData.participants} Participants
              </span>
            </div>
          </div>
          <div className="order-2 md:order-1 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="text-graycolor">Duration:</span>
              <div className="ml-2 opacity-60">{campaignData.duration}</div>
            </div>
            <div className="flex items-center">
              <span className="text-graycolor">End:</span>
              <div className="ml-2 opacity-60">{campaignData.end}</div>
            </div>
            <div className="flex items-center">
              <span className="text-graycolor">Community:</span>
              <div className="ml-2 opacity-60">{campaignData.community}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 px-4">
        <span className="text-bluebutton font-medium">Submissions</span>
      </div>

      {/* Submissions */}
      <div>
        {campaignData.submissions.map((submission) => (
          <div key={submission.id} className="p-4 border-b md:border-b-0">
            <div className="md:grid md:grid-cols-4 md:items-center md:gap-x-4">
              <div className="flex justify-between items-start mb-2 md:mb-0 md:col-span-1">
                <div className="flex items-center gap-3">
                  <img
                    src={submission.image}
                    alt="Submission thumbnail"
                    className="w-16 h-16 md:w-28 md:h-16 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{submission.author}</div>
                    <div className="text-bluebutton text-sm">
                      {submission.platform}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:hidden">
                  <span className="font-medium">{submission.votes}</span>
                  <LuSquareArrowUp size={16} className="text-graycolor" />
                </div>
              </div>

              <div className="hidden md:flex items-center gap-1 md:col-span-1">
                <span className="font-medium">{submission.votes}</span>
                <LuSquareArrowUp size={16} className="text-graycolor" />
              </div>

              <div className="mb-4 md:mb-0 md:col-span-1">
                <p className="text-gray-700">{submission.text}</p>
              </div>

              <div className="flex gap-2 justify-end md:col-span-1">
                <button className="bg-[#FF5789] text-white rounded px-3 py-1 text-sm">
                  Remove
                </button>
                <button 
                  className="bg-bluebutton text-white rounded px-3 py-1 text-sm"
                  onClick={() => onApproveClick(submission)}
                >
                  Approve for voting
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center w-full md:w-auto justify-center">
          <button
            className="flex items-center text-graycolor hover:text-gray-900 text-xs md:text-sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <FaArrowLeft className="text-xs md:text-sm" />
            <span className="ml-1 md:ml-2">Previous</span>
          </button>

          <div className="flex space-x-1 md:space-x-2 mx-2 md:mx-4">
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-xs md:text-base ${
                  page === currentPage
                    ? "bg-gray-800 text-white"
                    : "text-graycolor hover:bg-gray-200"
                } ${
                  typeof page === "string" ? "cursor-default" : "cursor-pointer"
                }`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="flex items-center text-graycolor hover:text-gray-900 text-xs md:text-sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <span className="mr-1 md:mr-2">Next</span>
            <FaArrowRight className="text-xs md:text-sm" />
          </button>
        </div>

        <div className="flex items-center mt-4 self-end">
          <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
          <span className="text-graycolor">Running</span>
        </div>
      </div>
    </div>
  );
}