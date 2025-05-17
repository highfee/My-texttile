import {
  ProjectTemplates,
  recentProjects,
} from "@/data/adminData/userData/home";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";
import BestSeller from "@/components/dashboard/sidebarcomponents/BestSeller"; // Import the BestSeller component

export default function index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recentProjects"],
    queryFn: async () => {
      const { data } = await httpClient.get("/designs/shop/view");
      return data;
    },
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showBestSeller, setShowBestSeller] = useState(false); // New state for showing BestSeller
  const contentRef = useRef(null);

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width > 1200) {
          setIsSidebarCollapsed(true); // Sidebar is collapsed
        } else {
          setIsSidebarCollapsed(false); // Sidebar is expanded
        }
      }
    });
    resizeObserver.observe(contentElement);
    return () => {
      resizeObserver.unobserve(contentElement);
    };
  }, []);

  if (showBestSeller) {
    return (
      <BestSeller
        onBack={() => setShowBestSeller(false)}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    );
  }

  return (
    <div className=" flex flex-col ">
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-1 sm:px-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        <style>
          {`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="flex justify-center mb-6 lg:h-[150px]">
          <img
            src="/dashboard/Banner.png"
            alt="Banner"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="flex overflow-x-auto whitespace-nowrap pb-2 sm:justify-center space-x-4">
          <button className="inline-flex text-white px-4 py-2 rounded-full bg-gradient-to-r from-[#016FDE] to-[#013C78] transition-colors items-center gap-2 mr-2 sm:mr-0">
            <img
              src="/dashboard/star.png"
              alt="Magic Wand"
              className="w-5 h-5"
            />
            <span className="pr-6 lg:pr-0">New Products</span>
          </button>
          <button
            onClick={() => setShowBestSeller(true)}
            className="inline-flex text-white px-4 py-2 rounded-full bg-gradient-to-r from-[#016FDE] to-[#013C78] transition-colors items-center gap-2 mr-2 sm:mr-0"
          >
            <img
              src="/dashboard/medal.png"
              alt="Magic Wand"
              className="w-5 h-5"
            />
            <span className="pr-6 lg:pr-0">Best Seller</span>
          </button>

          <Link
            href="/dashboard/design"
            className="inline-flex text-white px-4 py-2 rounded-full bg-gradient-to-r from-[#016FDE] to-[#013C78] transition-colors items-center gap-2"
          >
            <img
              src="/dashboard/leaf.png"
              alt="Magic Wand"
              className="w-5 h-5"
            />
            <span className="pr-6 lg:pr-0">New Design</span>
          </Link>
        </div>

        <div className="flex flex-row justify-between items-center sm:items-start mt-6">
          <p className="font-bold ">Recent Projects</p>
          <img
            src="/dashboard/arrange.svg"
            alt="Arrange Icon"
            className=" sm:ml-4"
          />
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
            isSidebarCollapsed ? "xl:grid-cols-5" : "xl:grid-cols-4"
          } gap-2 px-2 pb-6`}
        >
          {recentProjects.map((project, index) => (
            <div
              key={index}
              className="p-1 lg:p-4 rounded-lg transition-shadow duration-300"
            >
              <div>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <h2 className="text-[12px] lg:text-[14px] font-semibold ">
                {project.name}
              </h2>
              <p className="text-sm text-graycolor opacity-[0.44] ">
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
              <div className="flex flex-row ">
                <p className="text-md font-bold text-graycolor opacity-[0.44]">
                  Starting
                </p>
                <p className="text-lg font-bold text-graycolor px-2">
                  {project.price}
                </p>
              </div>
              <p className="text-graycolor opacity-[0.44]">S - XXL</p>
            </div>
          ))}
        </div>

        <div className="flex flex-row py-2 font-bold">
          <p>Templates</p>
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
              <h2 className="text-[12px] lg:text-[14px] font-semibold ">
                {project.name}
              </h2>
              <p className="text-sm text-graycolor opacity-[0.44] ">
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
              <div className="flex flex-row ">
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
