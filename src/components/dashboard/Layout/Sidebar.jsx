import React, { useState, useRef, useEffect } from "react";
import { ChartNoAxesColumn, Layers, Palette, Store } from "lucide-react";
import { LayoutDashboard, WalletMinimal } from "lucide-react";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";

const Sidebar = ({ setActiveComponent, isMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse
  const [activeItem, setActiveItem] = useState("Home"); // State to manage active sidebar item
  const sidebarRef = useRef(null); // Ref for detecting clicks outside the sidebar

  // Function to handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true); // Collapse sidebar when clicking outside
      }
    };

    // Only add the event listener if not on mobile
    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  // Function to handle sidebar item clicks
  const handleSidebarItemClick = (componentName) => {
    console.log("Clicked:", componentName); // Debugging log
    setActiveItem(componentName); // Set the active sidebar item
    setActiveComponent(componentName); // Update the active component in the parent
    if (isCollapsed && !isMobile) {
      setIsCollapsed(false); // Expand sidebar if collapsed (only on non-mobile screens)
    }
  };

  // Sidebar items data
  const sidebarItems = [
    { name: "Home", icon: <LayoutDashboard className="mr-2" /> },
    { name: "Purchase", icon: <WalletMinimal className="mr-2" /> },
    { name: "Analytics", icon: <ChartNoAxesColumn className="mr-2" /> },
    { name: "Store", icon: <Store className="mr-2" /> },
    { name: "Brand", icon: <Palette className="mr-2" /> },
    { name: "Listing", icon: <Layers className="mr-2" /> },
    {
      name: "Payout",
      icon: (
        <img
          src="/dashboard/credit-card-pos.svg"
          alt="Payout"
          className="w-6 h-6 mr-2"
        />
      ),
    },
    {
      name: "HelpCenter",
      icon: (
        <img
          src="/dashboard/elearning-exchange.svg"
          alt="HelpCenter"
          className="w-6 h-6 mr-2"
        />
      ),
    },
    {
      name: "Settings",
      icon: (
        <img
          src="/dashboard/settings-05.svg"
          alt="Settings"
          className="w-6 h-6 mr-2"
        />
      ),
    },
  ];

  // Filter sidebar items for mobile
  const mobileSidebarItems = sidebarItems.filter((item) =>
    ["Analytics", "Store", "Brand", "Learn", "Settings"].includes(item.name)
  );

  return (
    <div
      ref={sidebarRef}
      className={`h-screen ${
        isCollapsed && !isMobile ? "w-16" : "w-56"
      } bg-bluebutton text-white text-[14px] flex flex-col items-start py-4 space-y-4 transition-all duration-300`}
    >
      {/* Logo */}
      <div
        className={`w-full flex justify-start ${
          isCollapsed && !isMobile ? "px-2" : "pl-3"
        } transition-all duration-300`}
      >
        {isCollapsed && !isMobile ? (
          <img
            src="/landingpage/logo-f.svg" // Path to the collapsed logo
            alt="Collapsed Logo"
            className="" // Adjust size as needed
          />
        ) : (
          <img
            src="/dashboard/completelogo.svg" // Path to the expanded logo
            alt="Expanded Logo"
            className="hidden lg:block" // Adjust size as needed
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 lg:hidden w-full py-6">
        {/* First Row: Bell and User Profile */}
        <div className="flex flex-row items-center justify-center gap-1">
          {/* User Profile with Arrow */}
          <div className="w-full cursor-pointer flex items-center gap-2 ">
            <img
              src="/dashboard/Profile-pic.svg"
              alt="Profile"
              className=" rounded-full object-cover"
            />
            <div className="flex flex-col items-start justify-center">
              <p>Ahmad</p>
              <p className="opacity-[0.44]">Ahmad@gmail.com</p>
            </div>
            <IoIosArrowDown className="w-5 h-5 text-white opacity-[0.44]" />
          </div>
        </div>

        {/* Second Row: New Design Button */}
        <button className="bg-white font-bold text-black px-10 py-2 rounded-md transition-colors flex items-center gap-2">
          <img
            src="/dashboard/magic wand.svg"
            alt="Magic Wand"
            className="w-5 h-5"
          />
          <span>New Design</span>
        </button>
      </div>

      {/* Sidebar Items */}
      <div className="space-y-4 w-full">
        {(isMobile ? mobileSidebarItems : sidebarItems).map((item) => (
          <div
            key={item.name}
            className={`flex flex-row space-x-2 ${
              activeItem === item.name ? "opacity-100" : "opacity-[0.44]"
            } hover:opacity-100 cursor-pointer hover:border-l-4 border-white py-2 ${
              isCollapsed && !isMobile ? "pl-3" : "pl-10"
            } rounded-sm transition-all duration-300 ${
              activeItem === item.name ? "border-l-4" : ""
            }`}
            onClick={() => handleSidebarItemClick(item.name)}
          >
            {item.icon}
            {/* Always show text on mobile, conditionally show on desktop */}
            <p className={`${isCollapsed && !isMobile ? "hidden" : "block"}`}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;