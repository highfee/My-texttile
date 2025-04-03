import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMediaQuery from "@/components/hook/usemediaquery"; // Custom hook for media queries
import BottomBar from "./BottomBar"; // Import the BottomBar component

export default function Dashboardlayout({ children }) {
  const [activeComponent, setActiveComponent] = useState("Home"); // State to manage active component
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  // Use the custom hook to detect mobile screens
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside (on mobile)
  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px] leading-[19.6px]">
      {/* Sidebar */}
      <div
        className={`text-white lg:w-auto fixed lg:static inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          setActiveComponent={setActiveComponent}
          isMobile={isMobile}
          onClose={closeSidebar} // Pass the closeSidebar function
        />
      </div>

      {/* Overlay for Mobile (Closes Sidebar on Click) */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Render the active component */}
        <div className="flex-1 p-4 overflow-y-auto">
          {React.Children.toArray(children).find(
            (child) => child.props.name === activeComponent
          ) || <div>{activeComponent}</div>}
        </div>
      </div>

      {/* Bottom Bar (Visible only on mobile screens) */}
      {isMobile && (
        <BottomBar onItemClick={setActiveComponent} /> // Pass setActiveComponent as onItemClick
      )}
    </div>
  );
}