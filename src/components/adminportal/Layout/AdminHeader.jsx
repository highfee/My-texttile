import React, { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdNotes } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import Notification from "./Notification"; // Import your Notification component

const AdminHeader = ({ toggleSidebar, currentComponent }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="w-full px-2 lg:px-8 py-3 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <button
              onClick={toggleSidebar}
              className="border border-gray-300 rounded-md p-1"
            >
              <LuLayoutDashboard className="w-6 h-6" />
            </button>
          </div>
          <h1 className="hidden lg:flex text-xl font-semibold text-gray-800 capitalize">
            {currentComponent}
          </h1>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={toggleNotifications}
              className="p-1 cursor-pointer relative"
            >
              <MdNotes className="w-5 h-5 text-graycolor border border-graycolor rounded-md" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50">
                <Notification />
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2 cursor-pointer">
            <img
              src="/dashboard/Profile-pic.svg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-right">
              <p className="text-sm font-medium">James Fisher</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-between items-center px-6 lg:px-2 gap-4">
        <button className="hidden lg:flex border border-[#12121270] rounded-full px-4 py-1 text-sm text-graycolor hover:bg-gray-100 transition">
          + add creator
        </button>
        <div className="border border-[#12121270] rounded-full px-1 py-1 text-sm text-graycolor flex items-center  w-full lg:w-auto overflow-x-auto">
          <CiCalendar className="text-graycolor text-lg font-bold whitespace-nowrap" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-sm  px-2 py-1  "
          />
          <p>-</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-sm  px-2 py-1  "
          />
          <IoIosArrowDown className="text-[#12121270] w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;