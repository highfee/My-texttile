import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBarAdmin from "../BottomBarAdmin";
import { useRouter } from "next/router";
import { Inter } from 'next/font/google'


 
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  // Extract current page name from path
  const currentPage = router.pathname.split('/adminportal/').pop() || 'dashboard';

  return (
    <div className={`flex flex-col lg:flex-row h-screen tracking-[-1px] ${inter.className}`}>
      <div className={`fixed lg:static inset-y-0 left-0 z-20 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-300`}>
        <AdminSideBar 
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        <AdminHeader
          toggleSidebar={toggleSidebar}
          currentComponent={currentPage}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 p-4 overflow-y-auto pb-16"> 
          {children}
        </div>
      </div>

      {/* Mobile bottom bar */}
      {isMobile && (
        <BottomBarAdmin 
          activeItem={currentPage}
        />
      )}
    </div>
  );
}