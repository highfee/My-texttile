import React, { useState, Children, cloneElement } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBar from "./BottomBar";
import Account from "../sidebarcomponents/Settings/Account";
import Campaign from "./Headercomponents/Campaign";
export default function Dashboardlayout({ children }) {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
  const componentsMap = {};
  Children.forEach(children, child => {
    if (child.props && child.props.name) {
      componentsMap[child.props.name] = child;
    }
  });

  // Add header dropdown components that might not be in sidebar
  const allComponents = {
    ...componentsMap,
    "Affiliate Program": <div>Affiliate Program Component</div>,
    Campaign: <Campaign/> ,
    Account: <Account/>
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px] leading-[19.6px]">
      <div
        className={`text-white lg:w-auto fixed lg:static inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          setActiveComponent={setActiveComponent}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      </div>
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        <Header 
          toggleSidebar={toggleSidebar} 
          setActiveComponent={setActiveComponent}
        />
        <div className="flex-1 p-4 overflow-y-auto">
          {allComponents[activeComponent] || (
            <div>Component "{activeComponent}" not found</div>
          )}
        </div>
      </div>
      {isMobile && (
        <BottomBar setActiveComponent={setActiveComponent} />
      )}
    </div>
  );
}