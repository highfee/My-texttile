import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBar from "./BottomBar";
import Account from "../sidebarcomponents/Settings/Account";
import Campaign from "./Headercomponents/Campaign";
import AffiliateProgram from "./Headercomponents/AfiliateProgram";
import Design from "../design/Main";
import { useDashboardComponentStore } from "@/store/useDashboadComponent";

export default function DashboardLayout({ children }) {
  // const [activeComponent, setActiveComponent] = useState("Home");

  // use store instead of useState
  const { activeComponent, setActiveComponent } = useDashboardComponentStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [componentProps, setComponentProps] = useState({});
  const [showCanvas, setShowCanvas] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  // const [componentProps, setComponentProps] = useState({});

  const handleSetActiveComponent = (component) => {
    if (typeof component === "object" && component.name) {
      setActiveComponent(component.name);
      setComponentProps(component.props || {});
    } else {
      setActiveComponent(component);
      setComponentProps({});
    }
  };

  const componentsMap = React.useMemo(() => {
    const map = {};
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.name) {
        map[child.props.name] = child;
      }
    });
    return map;
  }, [children]);

  const allComponents = {
    ...componentsMap,
    "Affiliate Program": <AffiliateProgram />,
    Campaign: <Campaign />,
    Account: <Account />,
    Design: <Design />,
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px]">
      <div
        className={`fixed lg:static inset-y-0 left-0 z-20 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform duration-300`}
      >
        <Sidebar
          setActiveComponent={handleSetActiveComponent}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      </div>

      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        {activeComponent.toLowerCase() !== "design" && (
          <Header
            toggleSidebar={toggleSidebar}
            setActiveComponent={setActiveComponent}
          />
        )}

        <div className="flex-1 p-4 overflow-y-auto relative">
          {allComponents[activeComponent] || (
            <div>Component "{activeComponent}" not found</div>
          )}
        </div>
      </div>
      {isMobile && <BottomBar setActiveComponent={setActiveComponent} />}
    </div>
  );
}
