"use client";
import { useState } from "react";
import Ordered from "@/components/dashboard/sidebarcomponents/Listing/Ordered";
import Tshirt from "@/components/dashboard/sidebarcomponents/Listing/Tshirt";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import Hoodies from "@/components/dashboard/sidebarcomponents/Listing/Hoodies";
import Turtleneck from "@/components/dashboard/sidebarcomponents/Listing/Turtleneck";
import Polo from "@/components/dashboard/sidebarcomponents/Listing/Polo";
import Denim from "@/components/dashboard/sidebarcomponents/Listing/Demin";
import { useGetAllDesigns } from "@/store/apiCalls/useDesignStore";

const Index = () => {
  const [activeTab, setActiveTab] = useState("t_shirt");
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const {
    data: recentProjects,
    isLoading,
    error,
    refetch,
  } = useGetAllDesigns();

  const retryConnection = () => {
    refetch();
  };

  const tabs = [
    {
      name: "T-shirt",
      value: "t_shirt",
    },
    {
      name: "Hoodies",
      value: "hoodies",
    },
    {
      name: "Sweatshirts",
      value: "sweatshirt",
    },
    {
      name: "Turtle necks",
      value: "Turtle necks",
    },
    {
      name: "Polos",
      value: "Polos",
    },
    {
      name: "Denim",
      value: "Denim",
    },
    {
      name: "Ordered",
      value: "Ordered",
    },
  ];

  const toggleSection = (section) => {
    // Don't toggle if it's "Best Selling"
    if (section !== "Best Selling") {
      setExpanded((prev) => (prev === section ? null : section));
    }
  };

  const filters = {
    Availability: ["Low Stock", "In Stock", "Out of Stock"],
    Size: ["XS", "S", "M", "L", "XL", "XXL"],
    "Price Range": [" <$50", ">$100"],
    "Best Selling": [], // Empty array means no sub-options
  };

  const products = recentProjects?.filter(
    (product) =>
      product.product_category ===
      activeTab.replace(" ", "_").replace("-", "_").toLowerCase()
  );

  console.log(recentProjects, products);
  return (
    <div className="lg:px-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full">
        <div className="flex flex-wrap shadow-md rounded-lg w-full lg:w-auto">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab.value)}
              className={`px-2 lg:px-6 py-2 rounded-lg text-xs sm:text-sm md:text-base ${
                activeTab === tab.value
                  ? "bg-bluebutton text-white"
                  : "text-gray-600"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex justify-end w-full lg:w-auto mt-2 lg:mt-0 relative">
          <div className="flex items-center space-x-2">
            {/* Filter Button */}
            <div
              className="flex items-center space-x-2 border border-black rounded-lg px-2 py-1 cursor-pointer"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <CiFilter className="text-[16px] sm:text-[20px]" />
              <p className="text-xs sm:text-sm hidden lg:flex">Filter</p>
              <IoIosArrowDown
                className={`hidden lg:flex transition-transform duration-200 ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className="border border-black rounded-md p-1">
              <IoGridOutline className="text-[16px] sm:text-[20px]" />
            </div>
          </div>
          {showFilters && (
            <div className="absolute right-0 mt-10 bg-white shadow-md rounded-lg p-1 w-44 z-10">
              {Object.entries(filters).map(([section, options]) => (
                <div key={section} className="mb-2">
                  <button
                    onClick={() => toggleSection(section)}
                    className={`w-full flex justify-between items-center text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md ${
                      section === "Best Selling"
                        ? "cursor-default"
                        : "cursor-pointer"
                    }`}
                  >
                    {section}
                    {section !== "Best Selling" && (
                      <IoIosArrowDown
                        className={`transform transition-transform duration-200 ${
                          expanded === section ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {expanded === section && section !== "Best Selling" && (
                    <div className="pl-4 py-1 text-sm text-gray-500 space-y-1">
                      {options.map((option) => (
                        <p
                          key={option}
                          className="hover:text-black cursor-pointer"
                        >
                          {option}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        {isLoading
          ? "loading"
          : activeTab !== "Ordered" && <Tshirt data={products} />}
        {activeTab === "Ordered" && <Ordered />}
      </div>
    </div>
  );
};
export default Index;
