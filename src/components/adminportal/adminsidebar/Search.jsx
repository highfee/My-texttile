import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdDeleteOutline, MdOutlineReportProblem } from "react-icons/md";
import { CiPause1, CiPlay1, CiCalendar } from "react-icons/ci";
import { IoRocketOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { GoCopy } from "react-icons/go";
import { FaRegSquareCheck } from "react-icons/fa6";

const ActionDropdown = ({ onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-1 bg-white border rounded-md shadow-md z-20 w-48">
      <ul className="py-2">
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <MdDeleteOutline className="mr-2" />
          <span>Delete Account</span>
        </li>
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <CiPause1 className="mr-2" />
          <span>Suspend Account</span>
        </li>
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <CiPlay1 className="mr-2" />
          <span>Reactivate Account</span>
        </li>
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <IoRocketOutline className="mr-2" />
          <span>Upgrade Tier</span>
        </li>
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <MdOutlineReportProblem className="mr-2" />
          <span>Flag Account</span>
        </li>
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
          <FiEdit className="mr-2" />
          <span>Edit Profile</span>
        </li>
      </ul>
    </div>
  );
};

const CalendarDropdown = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-md z-10 w-64">
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        Today/24hrs Nov 16
      </button>
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        7 days ago Nov 16/23 - Nov 14/21
      </button>
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        2 weeks ago Nov 16/23 - Nov 14/21
      </button>
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        2 weeks ago Nov 16/23 - Nov 14/21
      </button>
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        30 days Oct 16/21 - Nov 14/21
      </button>
      <button className="flex flex-row w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        <CiCalendar className="mr-2" />
        365(Year) days Oct 16/21 - Nov 14/21
      </button>
    </div>
  );
};

const TierDropdown = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-md z-10 w-32">
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        Tier 1
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        Tier 2
      </button>
      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
        Tier 3
      </button>
    </div>
  );
};

export default function Search() {
  const [showActionDropdown, setShowActionDropdown] = useState(null);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  const actionDropdownRef = useRef(null);
  const calendarDropdownRef = useRef(null);
  const tierDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target)) {
        setShowActionDropdown(null);
      }
      if (calendarDropdownRef.current && !calendarDropdownRef.current.contains(event.target)) {
        setShowCalendarDropdown(false);
      }
      if (tierDropdownRef.current && !tierDropdownRef.current.contains(event.target)) {
        setShowTierDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleActionDropdown = (e) => {
    e.stopPropagation();
    setShowActionDropdown(showActionDropdown === "header" ? null : "header");
  };

  const toggleCalendarDropdown = (e) => {
    e.stopPropagation();
    setShowCalendarDropdown(!showCalendarDropdown);
  };

  const toggleTierDropdown = (e) => {
    e.stopPropagation();
    setShowTierDropdown(!showTierDropdown);
  };

  return (
    <div className="flex flex-row justify-between items-center lg:p-4">
      <div className="flex items-center border px-3 py-2 rounded-md bg-white">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for anything"
          className="outline-none flex-grow text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={calendarDropdownRef}>
          <button
            onClick={toggleCalendarDropdown}
            className="hidden lg:flex items-center border p-2 rounded-md text-sm whitespace-nowrap"
          >
            <CiCalendar className="mr-2" />
            <div className="flex flex-row">
              <p className="font-semibold px-1">Created</p>
              <span>Oct 16/21-Nov 14/21</span>
            </div>
          </button>
          {showCalendarDropdown && (
            <CalendarDropdown onClose={() => setShowCalendarDropdown(false)} />
          )}
        </div>

        <div className="relative" ref={tierDropdownRef}>
          <button
            onClick={toggleTierDropdown}
            className="border p-2 rounded-md text-sm whitespace-nowrap hidden lg:flex items-center gap-2"
          >
            <GoCopy className="text-gray-500" />
            <span>Tier</span>
            <IoIosArrowDown className="text-xs" />
          </button>
          {showTierDropdown && (
            <TierDropdown onClose={() => setShowTierDropdown(false)} />
          )}
        </div>

        <div className="relative" ref={actionDropdownRef}>
          <button
            onClick={toggleActionDropdown}
            className="text-gray-700 border flex items-center gap-1 lg:gap-2 px-1 lg:px-3 py-2 rounded-md text-sm whitespace-nowrap"
          >
            <FaRegSquareCheck className="text-base" />
            Action
            <IoIosArrowDown />
          </button>
          {showActionDropdown === "header" && (
            <ActionDropdown onClose={() => setShowActionDropdown(null)} />
          )}
        </div>
      </div>
    </div>
  );
}