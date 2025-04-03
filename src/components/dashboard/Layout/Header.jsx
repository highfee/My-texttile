import React from "react";
import { Bell, User, Search } from "lucide-react"; 
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-3 px-3 gap-x-6 lg:gap-x-0">
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className=" border border-graycolor  rounded-md"
          >
            <IoIosMenu className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center ">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5  text-graycolor" />
            </div>
            <input
              type="text"
              placeholder="Search for a project"
              className="w-full pl-10 pr-4 py-1 lg:py-2 border border-graycolor rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div className=" items-center justify-end gap-4 hidden lg:flex">
          <div className="relative cursor-pointer bg-[#282828] rounded-full p-1">
            <Bell className="w-6 h-6 text-white " />
            <span className="absolute top-0 right-0 bg-bluebutton text-white text-xs rounded-full w-2 h-2 flex items-center justify-center">
            </span>
          </div>
          <div className="cursor-pointer flex items-center gap-2">
            <img
              src="/dashboard/Profile-pic.svg" 
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <IoIosArrowDown className="w-5 h-5 text-gray-600" />
          </div>
          <button className="bg-bluebutton text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
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