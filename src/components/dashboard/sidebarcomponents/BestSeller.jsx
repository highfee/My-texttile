import { useState } from "react";
import { ProjectTemplates } from "@/data/adminData/userData/home";
import { FaArrowLeft } from "react-icons/fa";

export default function BestSeller({ onBack, isSidebarCollapsed }) {
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const tabs = ["New Products", "Best Sellers", "Templates"];

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto px-1 sm:px-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-blue-500"
          >
            <FaArrowLeft size={18} />
          </button>

          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  activeTab === tab
                    ? "text-blue-500 font-bold"
                    : "text-gray-600 font-medium"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
            isSidebarCollapsed ? "xl:grid-cols-5" : "xl:grid-cols-4"
          } gap-2 px-2 pb-6`}
        >
          {ProjectTemplates.map((project, index) => (
            <div
              key={index}
              className="p-1 lg:p-4 rounded-2xl transition-shadow duration-300"
            >
              <div>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full lg:h-[200px] rounded-lg object-cover object-top"
                />
              </div>
              <h2 className="text-[12px] lg:text-[14px] font-semibold">
                {project.name}
              </h2>
              <p className="text-sm text-graycolor opacity-[0.44]">
                {project.description}
              </p>
              <div className="flex flex-row space-x-1">
                <div className="rounded-sm bg-bluebutton w-[14px] h-[14px]"></div>
                <div className="rounded-sm bg-[#FF5789] w-[14px] h-[14px]"></div>
                <div className="rounded-sm bg-[#A1A1A1] w-[14px] h-[14px]"></div>
                <div className="rounded-sm bg-[#5A57FF] w-[14px] h-[14px]"></div>
                <div className="rounded-sm bg-[#124A86] w-[14px] h-[14px]"></div>
                <div className="rounded-sm bg-[#160A0A] w-[14px] h-[14px]"></div>
              </div>
              <div className="flex flex-row">
                <p className="text-[16px] font-bold text-graycolor opacity-[0.44]">
                  Starting
                </p>
                <p className="text-[17px] lg:text-xl font-semibold text-graycolor px-2">
                  {project.price}
                </p>
              </div>
              <p className="text-graycolor opacity-[0.44]">S - XXL</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
