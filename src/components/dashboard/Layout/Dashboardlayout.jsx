import React, { useState, Children, useEffect } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { activeComponent, setActiveComponent } = useDashboardComponentStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [componentProps, setComponentProps] = useState({});
  const [showCanvas, setShowCanvas] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const isMobile = useMediaQuery("(max-width: 1024px)");

  // Initialize from URL on first load
  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      if (tab && allComponents[tab]) {
        setActiveComponent(tab);
        setActiveItem(tab);
      }
    }
  }, [router.isReady]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  const handleSetActiveComponent = (component, props = {}) => {
    let componentName = component;
    if (typeof component === "object" && component.name) {
      componentName = component.name;
      setComponentProps(component.props || {});
    } else {
      setComponentProps({});
    }
    setActiveComponent(componentName);
    if (["Home", "Purchase", "Listing", "Payout"].includes(componentName)) {
      setActiveItem(componentName);
    }
    router.push({
      pathname: router.pathname,
      query: { tab: componentName }
    }, undefined, { shallow: true });
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
            setActiveComponent={handleSetActiveComponent}
          />
        )}

        <div className="flex-1 p-4 overflow-y-auto relative">
          {allComponents[activeComponent] || (
            <div>Component "{activeComponent}" not found</div>
          )}
        </div>
      </div>
      {isMobile && (
        <BottomBar
          onItemClick={handleSetActiveComponent} // Use the same handler
          activeItem={activeItem}
        />
      )}
    </div>
  );
}