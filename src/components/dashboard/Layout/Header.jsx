// components/dashboard/Layout/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { useRouter } from "next/router";
import { useDashboardComponentStore } from "@/store/useDashboadComponent";

const Header = ({ toggleSidebar }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setActiveComponent } = useDashboardComponentStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    router.push(`/dashboard/${path}`);
    setIsDropdownOpen(false);
  };

  const handleNewDesign = () => {
    setActiveComponent("Design");
    router.push("/dashboard/design");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3 px-3 gap-x-6 lg:gap-x-0">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className="border border-graycolor rounded-md"
          >
            <IoIosMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Search bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 text-graycolor" />
            </div>
            <input
              type="text"
              placeholder="Search for a project"
              className="w-full pl-10 pr-4 py-1 lg:py-2 border border-graycolor rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Desktop controls */}
        <div className="items-center justify-end gap-4 hidden lg:flex">
          <div className="relative cursor-pointer bg-[#282828] rounded-full p-1">
            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-0 right-0 bg-bluebutton text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="/dashboard/Profile-pic.svg"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <IoIosArrowDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNavigation("account")}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNavigation("affiliateprogram")}
                  >
                    Affiliate Program
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNavigation("store")}
                  >
                    Store
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleNavigation("campaign")}
                  >
                    Campaign
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            className="bg-bluebutton text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            onClick={handleNewDesign}
          >
            <img
              src="/dashboard/magic wand.svg"
              alt="Magic Wand"
              className="w-5 h-5"
            />
            <span>New Design</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;