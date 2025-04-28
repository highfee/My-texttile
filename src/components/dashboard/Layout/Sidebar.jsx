// components/dashboard/Layout/Sidebar.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChartNoAxesColumn, Layers, Palette, Store } from "lucide-react";
import { LayoutDashboard, WalletMinimal } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import { Bell } from "lucide-react";
import { useRouter } from "next/router";

const Sidebar = ({ isMobile, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const router = useRouter();

  const handleSidebarItemClick = (path) => {
    router.push(`/dashboard/${path}`);
    if (isMobile) onClose();
  };

  // Handle clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
        if (isMobile) onClose();
      }
    };

    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, onClose]);

  // Handle clicks outside mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileDropdownOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const sidebarItems = [
    { name: "Home", icon: <LayoutDashboard className="mr-2" />, path: "home", showOnMobile: false },
    { name: "Purchase", icon: <WalletMinimal className="mr-2" />, path: "purchase", showOnMobile: false },
    { name: "Analytics", icon: <ChartNoAxesColumn className="mr-2" />, path: "analytics", showOnMobile: true },
    { name: "Store", icon: <Store className="mr-2" />, path: "store", showOnMobile: true },
    { name: "Brand", icon: <Palette className="mr-2" />, path: "brand", showOnMobile: true },
    { name: "Listing", icon: <Layers className="mr-2" />, path: "listing", showOnMobile: false },
    {
      name: "Payout",
      icon: <img src="/dashboard/credit-card-pos.svg" alt="Payout" className="w-6 h-6 mr-2" />,
      path: "payout",
      showOnMobile: false
    },
    {
      name: "Settings",
      icon: <img src="/dashboard/settings-05.svg" alt="Settings" className="w-6 h-6 mr-2" />,
      path: "settings",
      showOnMobile: true
    },
  ];

  const filteredItems = isMobile 
    ? sidebarItems.filter(item => item.showOnMobile) 
    : sidebarItems;

  return (
    <div
      ref={sidebarRef}
      className={`h-screen ${
        isCollapsed && !isMobile ? "w-16" : "w-56"
      } bg-bluebutton text-white text-[14px] flex flex-col items-start py-4 space-y-4 transition-all duration-300`}
    >
      {/* Logo */}
      <div className={`w-full flex justify-start ${
        isCollapsed && !isMobile ? "px-2" : "pl-3"
      } transition-all duration-300`}>
        {isCollapsed && !isMobile ? (
          <img src="/landingpage/logo-f.svg" alt="Collapsed Logo" className="w-8 h-8" />
        ) : (
          <img src="/dashboard/completelogo.svg" alt="Expanded Logo" className="hidden lg:block h-8" />
        )}
      </div>

      {/* Mobile Profile Section */}
      {isMobile && (
        <div className="flex flex-col items-center justify-center gap-2 w-full py-6 px-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="relative cursor-pointer bg-[#282828] rounded-full p-2">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-0 right-0 bg-bluebutton text-white text-xs rounded-full w-2 h-2 flex items-center justify-center"></span>
            </div>

            <div className="relative flex-1 ml-4" ref={mobileDropdownRef}>
              <div
                className="cursor-pointer flex items-center gap-2"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              >
                <img
                  src="/dashboard/Profile-pic.svg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="text-sm">Ahmad</p>
                  <p className="text-xs opacity-[0.44]">Ahmad@gmail.com</p>
                </div>
                <IoIosArrowDown className={`w-4 h-4 text-white opacity-[0.44] transition-transform ${
                  isMobileDropdownOpen ? "transform rotate-180" : ""
                }`} />
              </div>

              {isMobileDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md z-50">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      onClick={() => {
                        handleSidebarItemClick("account");
                        setIsMobileDropdownOpen(false);
                      }}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                      onClick={() => {
                        handleSidebarItemClick("affiliate-program");
                        setIsMobileDropdownOpen(false);
                      }}
                    >
                      Affiliate Program
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <button 
            className="bg-white font-bold text-black px-10 py-2 rounded-md transition-colors flex items-center gap-2 w-full justify-center mt-4"
            onClick={() => handleSidebarItemClick("design")}
          >
            <img src="/dashboard/magic wand.svg" alt="Magic Wand" className="w-5 h-5" />
            <span>New Design</span>
          </button>
        </div>
      )}

      {/* Sidebar Items */}
      <div className="space-y-4 w-full overflow-y-auto">
        {filteredItems.map((item) => {
          const isActive = router.pathname.includes(item.path);
          return (
            <div
              key={item.name}
              className={`flex flex-row space-x-2 ${
                isActive ? "opacity-100" : "opacity-[0.44]"
              } hover:opacity-100 cursor-pointer hover:border-l-4 border-white py-2 ${
                isCollapsed && !isMobile ? "pl-3" : "pl-10"
              } rounded-sm transition-all duration-300 ${
                isActive ? "border-l-4" : ""
              }`}
              onClick={() => handleSidebarItemClick(item.path)}
            >
              {item.icon}
              <p className={`${isCollapsed && !isMobile ? "hidden" : "block"}`}>
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;