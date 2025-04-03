'use client';

import { useState } from 'react';
import Ordered from './Ordered';
import Tshirt from './Tshirt';
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";

const Listing = () => {
  const [activeTab, setActiveTab] = useState('T-shirt');

  const tabs = ['T-shirt', 'Hoodies', 'Turtle necks', 'Polos', 'Denim', 'Ordered'];

  return (
    <div className="lg:px-16">
      {/* Tabs and Filters Wrapper */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
        {/* Tabs Section */}
        <div className="flex flex-wrap shadow-md rounded-lg w-full lg:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 lg:px-6 py-2 rounded-lg text-xs sm:text-sm md:text-base ${
                activeTab === tab ? 'bg-bluebutton text-white' : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters Section - Moves Below on Small Screens */}
        <div className="flex justify-end w-full lg:w-auto mt-2 lg:mt-0">
          <div className="flex items-center space-x-2">
            {/* Filter Button */}
            <div className="flex items-center space-x-2 border border-black rounded-lg px-2 py-1">
              <CiFilter className="text-[16px] sm:text-[20px]" />
              <p className="text-xs sm:text-sm hidden lg:flex">Filter</p>
              <IoIosArrowDown className="hidden lg:flex" />
            </div>
            {/* Grid Icon */}
            <div className="border border-black rounded-md p-1">
              <IoGridOutline className="text-[16px] sm:text-[20px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {activeTab === 'T-shirt' && <Tshirt />}
        {activeTab === 'Hoodies' && <Hoodies />}
        {activeTab === 'Turtle necks' && <Turtlenecks />}
        {activeTab === 'Polos' && <Polos />}
        {activeTab === 'Denim' && <Denim />}
        {activeTab === 'Ordered' && <Ordered />}
      </div>
    </div>
  );
};

export default Listing;
