import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, Shapes } from "lucide-react";
import { CampaignCards } from "./CampaignCards";
import { LuSquareArrowUp } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { CreateCampaign } from "./CreateCampaign";

export default function Campaign() {
    const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const data = [
    { name: "Campaign 1", participants: 23 },
    { name: "Campaign 2", participants: 16 },
    { name: "Campaign 3", participants: 28 },
  ];

  return (
    <div className="lg:p-6  min-h-screen flex flex-col gap-y-4 px-2 lg:px-10">
      <h1 className="text-2xl font-semibold">Campaign</h1>
      <div className="flex lg:flex-row flex-col justify-between items-center bg-bluebutton p-4 rounded-lg shadow-lg">
        <div className="text-white">
          <p className="text-xl font-semibold py-4">
            Bring Your Community Into the Creative Process!
          </p>
          <p className=" text-sm max-w-lg">
            Launch campaigns where your community votes, submits ideas, and
            shapes your next design. Reward them with early access, discounts,
            or exclusive offers, and turn their input into best-sellers!
          </p>
        </div>
        <button 
          onClick={() => setShowCreateCampaign(true)}
          className="bg-white text-bluebutton font-semibold px-4 py-3 rounded-md"
        >
          Start a Campaign
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 flex  flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-2 rounded-lg shadow">
              <div className="px-4">
                <h2 className="text-lg font-semibold">Participants</h2>
                <p className="text-3xl font-bold">84</p>
              </div>

              <ResponsiveContainer width="100%" height={140} className="px-10">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#3498db" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-y-8">
              <div className="flex items-center gap-4  bg-white p-4 rounded-xl shadow-md w-80">
                <div className="bg-blue-100 rounded-full p-3">
                  <ArrowUp className="text-blue-500 w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-600 font-semibold text-sm">
                    Total Votes
                  </h2>
                  <p className="text-3xl font-bold">2156</p>
                </div>
                <div className="flex items-center text-green-500 text-sm ml-auto">
                  <ArrowUp className="w-4 h-4" />
                  <span>6.65%</span>
                </div>
              </div>
              <div className="flex items-center gap-4   bg-white p-4 rounded-xl shadow-md w-80">
                <div className="bg-blue-100 rounded-full p-3">
                  <Shapes className="text-blue-500 w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-gray-600 font-semibold text-sm">
                    Appr. Design
                  </h2>
                  <p className="text-3xl font-bold">1236</p>
                </div>
                <div className="flex items-center text-green-500 text-sm ml-auto">
                  <ArrowUp className="w-4 h-4" />
                  <span>6.65%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <CampaignCards />
          </div>
        </div>
        <div className="bg-white p-2 w-full items-center justify-center lg:p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Participants</h2>
            <div className="flex flex-row items-center gap-1 text-sm opacity-[0.55] py-2 px-3 rounded-md border border-[#12121270] cursor-pointer">
              <span>Campaign</span>
              <IoIosArrowDown />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                image: "/dashboard/campaign/Ellipse1.svg",
                name: "Kristin W.",
                votes: 16,
                number: 60,
              },
              {
                image: "/dashboard/campaign/Ellipse2.svg",
                name: "Brooklyn S.",
                votes: 16,
                number: 1,
              },
              {
                image: "/dashboard/campaign/Ellipse3.png",
                name: "Kathryn M.",
                votes: 16,
                number: 16,
              },
              {
                image: "/dashboard/campaign/Ellipse4.png",
                name: "Arlene M.",
                votes: 16,
                number: 64,
              },
              {
                image: "/dashboard/Profile-pic.svg",
                name: "Theresa W.",
                votes: 16,
                number: 16,
              },
              {
                image: "/dashboard/campaign/Ellipse5.svg",
                name: "Devon L.",
                votes: 16,
                number: 17,
              },
            ].map((person, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-1 bg-[#F4F4F4] rounded-md border border-[#12121270] p-3"
              >
                <img
                  src={person.image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={person.name}
                />
                <p className="text-sm font-medium text-center">{person.name}</p>
                <div className="ml-auto flex items-center gap-x-2">
                  <p className="text-sm px-2 py-1 rounded-md flex flex-row gap-x-2 bg-[#016FDE1A]">
                    {person.votes}{" "}
                    <LuSquareArrowUp className="items-baseline text-xl" />
                  </p>
                  <p className="text-xs text-gray-500 border border-[#12121270] px-2 rounded-md ">
                    No.
                    <span className="text-lg text-graycolor font-semibold">
                      {person.number}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showCreateCampaign && (
        <CreateCampaign onClose={() => setShowCreateCampaign(false)} />
      )}
    </div>
  );
}
