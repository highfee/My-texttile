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
import { useRouter } from "next/router";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { MdAnalytics } from "react-icons/md";
import { PiHeadsetBold } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";
import { PiStorefrontFill } from "react-icons/pi";
const AdminSideBar = ({ isMobile, onClose }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('dashboard');
  const sidebarRef = useRef(null);
  useEffect(() => {
    const currentPath = router.pathname.split('/').pop();
    setActiveItem(currentPath || 'admindashboard');
  }, [router.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isMobile) onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, onClose]);

  const handleSidebarItemClick = (path) => {
    router.push(`/adminportal/${path}`);
    if (isMobile) onClose();
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <LayoutDashboardIcon className="w-5 h-5" />, showOnMobile: false, path: "dashboard" },
    { name: "Creator", icon: <Users className="w-5 h-5" />, showOnMobile: false, path: "creator" },
    { name: "Store & Product", icon: <PiStorefrontFill className="w-5 h-5" />, showOnMobile: true, path: "storeproduct" },
    { name: "Campaigns", icon: <HiOutlineMegaphone className="w-5 h-5" />, showOnMobile: false, path: "campaigns" },
    { name: "Payout", icon: <PiCurrencyDollarSimple className="w-5 h-5" />, showOnMobile: true, path: "payout" },
    { name: "Analytics", icon: <MdAnalytics className="w-5 h-5" />, showOnMobile: true, path: "analytics" },
    { name: "Help Center", icon: <PiHeadsetBold className="w-5 h-5" />, showOnMobile: true, path: "help-center" },
    { name: "Settings", icon: <VscSettings className="w-5 h-5" />, showOnMobile: false, path: "settings" },
    { name: "Member", icon: <img src="/adminportal/members.svg" alt="Members" />, showOnMobile: true, path: "members" },
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
          const isActive = activeItem === item.path;
          return (
            <React.Fragment key={item.name}>
              {item.name === "Member" && (
                <div className="px-4 text-md opacity-[0.44] text-graycolor pt-2">
                  <p>TEAMS</p>
                </div>
              )}
              <motion.div
                onClick={() => handleSidebarItemClick(item.path)}
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
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default AdminSideBar;