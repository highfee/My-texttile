// components/dashboard/Layout/DashboardLayout.jsx
import React, { useState, Children } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBar from "./BottomBar";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px]">
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-20 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300`}
      >
        <Sidebar
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        <Header
          toggleSidebar={toggleSidebar}
        />
        
        <div className="flex-1 p-4 overflow-y-auto relative">
          {children}
        </div>
      </div>

      {/* Mobile bottom bar */}
      {isMobile && (
        <BottomBar />
      )}
    </div>
  );
}