import React, { useState, useRef, useEffect } from "react";
import {
  BarChart2,
  HelpCircle,
  LayoutDashboardIcon,
  Megaphone,
  Popcorn,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const AdminSideBar = ({ setActiveComponent, isMobile, onClose }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isMobile) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, onClose]);

  const handleSidebarItemClick = (componentName) => {
    setActiveItem(componentName);
    setActiveComponent(componentName);
    if (isMobile) onClose();
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboardIcon className="w-5 h-5" />, showOnMobile: false },
    { name: "Creator", icon: <Users className="w-5 h-5" />, showOnMobile: false },
    { name: "Store & Product", icon: <ShoppingBag className="w-5 h-5" />, showOnMobile: true },
    { name: "Campaigns", icon: <Megaphone className="w-5 h-5" />, showOnMobile: false },
    { name: "Payout", icon: <Popcorn className="w-5 h-5" />, showOnMobile: true },
    { name: "Analytics", icon: <BarChart2 className="w-5 h-5" />, showOnMobile: true },
    { name: "Help Center", icon: <HelpCircle className="w-5 h-5" />, showOnMobile: true },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, showOnMobile: false },
  ];

  return (
    <div
      ref={sidebarRef}
      className="h-screen w-56 text-[14px] flex flex-col items-start py-4 space-y-4 bg-white shadow-md z-50 transition-all duration-300"
    >
      <div className="w-full pl-3">
        <img
          src="/adminportal/logo.png"
          alt="Expanded Logo"
          className="w-full px-10"
        />
      </div>

      <div className="px-4 text-md opacity-[0.44] text-graycolor">
        <p>MAIN MENU</p>
      </div>

      {sidebarItems
        .filter(item => !isMobile || item.showOnMobile)
        .map((item) => {
          const isActive = activeItem === item.name;
          return (
            <motion.div
              key={item.name}
              onClick={() => handleSidebarItemClick(item.name)}
              className={`relative flex flex-row space-x-3 items-center text-[16px] font-semibold ${
                isActive ? "text-bluebutton" : "text-graycolor"
              } transition-all ease-in-out duration-300 cursor-pointer py-1 pl-6 rounded-sm`}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05, y: -1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarItem"
                  className="absolute left-0 top-0 h-full w-full rounded-sm"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                />
              )}
              {item.icon}
              <p>{item.name}</p>
            </motion.div>
          );
        })}
        <>
          <div className="px-4 text-md opacity-[0.44] text-graycolor pt-2">
            <p>TEAMS</p>
          </div>

          <motion.div
            onClick={() => handleSidebarItemClick("Member")}
            className={`relative flex flex-row space-x-3 items-center text-[16px] font-semibold ${
              activeItem === "Member" ? "text-bluebutton" : "text-graycolor"
            } transition-all ease-in-out duration-300 cursor-pointer py-1 pl-6 rounded-sm`}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
          >
            {activeItem === "Member" && (
              <motion.div
                layoutId="activeSidebarItem"
                className="absolute left-0 top-0 h-full w-full rounded-sm"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <img src="/adminportal/members.svg" alt="Members" />
            <p>Member</p>
          </motion.div>
        </>
    </div>
  );
};

export default AdminSideBar;