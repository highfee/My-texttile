'use client';
import { useState } from 'react';
import Ordered from '@/components/dashboard/sidebarcomponents/Listing/Ordered';
import Tshirt from '@/components/dashboard/sidebarcomponents/Listing/Tshirt';
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import Hoodies from '@/components/dashboard/sidebarcomponents/Listing/Hoodies';
import Turtleneck from '@/components/dashboard/sidebarcomponents/Listing/Turtleneck';
import Polo from '@/components/dashboard/sidebarcomponents/Listing/Polo';
import Denim from '@/components/dashboard/sidebarcomponents/Listing/Demin';
const index = () => {
  const [activeTab, setActiveTab] = useState('T-shirt');

  const tabs = ['T-shirt', 'Hoodies', 'Turtle necks', 'Polos', 'Denim', 'Ordered'];

  return (
    <div className="lg:px-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
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
        <div className="flex justify-end w-full lg:w-auto mt-2 lg:mt-0">
          <div className="flex items-center space-x-2">
            {/* Filter Button */}
            <div className="flex items-center space-x-2 border border-black rounded-lg px-2 py-1">
              <CiFilter className="text-[16px] sm:text-[20px]" />
              <p className="text-xs sm:text-sm hidden lg:flex">Filter</p>
              <IoIosArrowDown className="hidden lg:flex" />
            </div>
            <div className="border border-black rounded-md p-1">
              <IoGridOutline className="text-[16px] sm:text-[20px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {activeTab === 'T-shirt' && <Tshirt />}
        {activeTab === 'Hoodies' && <Hoodies/> }
        {activeTab === 'Turtle necks' && <Turtleneck/> }
        {activeTab === 'Polos' && <Polo/> }
        {activeTab === 'Denim' && <Denim/> }
        {activeTab === 'Ordered' && <Ordered />}
      </div>
    </div>
  );
};

export default index;
