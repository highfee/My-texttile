import React, { useState, Children } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBar from "./BottomBar";
import Account from "../sidebarcomponents/Settings/Account";
import Campaign from "./Headercomponents/Campaign";
import AffiliateProgram from "./Headercomponents/AfiliateProgram";
import Createaccount from "@/components/signup/Createaccount";
import { CreateCampaign } from "./Headercomponents/CreateCampaign";
import Store from "../sidebarcomponents/Store/Store";
import StoreEditor from "../sidebarcomponents/Store/StoreEditor";
import Design from "../design/Main";

export default function DashboardLayout({ children }) {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [componentProps, setComponentProps] = useState({});
import { useDashboardComponentStore } from "@/store/useDashboadComponent";

export default function ssDashboardlayout({ children }) {
  // const [activeComponent, setActiveComponent] = useState("Home");

  // use store instead of useState
  const { activeComponent, setActiveComponent } = useDashboardComponentStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => isMobile && setIsSidebarOpen(false);

  const handleSetActiveComponent = (component, props = {}) => {
    if (typeof component === 'object' && component.name) {
      setActiveComponent(component.name);
      setComponentProps(component.props || {});
    } else {
      setActiveComponent(component);
      setComponentProps({});
    }
  };
  // const componentsMap = {};
  // Children.forEach(children, (child) => {
  //   if (child.props && child.props.name) {
  //     componentsMap[child.props.name] = child;
  //   }
  // });

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
    "Campaign": <Campaign />,
    "Account": <Account />,
    "Store": <Store setActiveComponent={handleSetActiveComponent} />,
    "StoreEditor": <StoreEditor onBack={() => handleSetActiveComponent("Store")} {...componentProps} />
  };

  const handleMainButtonClick = () => {
    if (activeComponent === "Campaign") {
      setShowCampaignPopup(true);
    } else {
      setShowCanvas(true);
    }
    // Campaign: <Campaign />,
    // Account: <Account />,
    // Design: <Design />,
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px]">
      <div className={`fixed lg:static inset-y-0 left-0 z-20 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-300`}>
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
<<<<<<< HEAD
        />
      )}

      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        <Header
          toggleSidebar={toggleSidebar}
          setActiveComponent={handleSetActiveComponent}
          currentComponent={activeComponent}
          onMainButtonClick={handleMainButtonClick}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 p-4 overflow-y-auto">
          {React.isValidElement(allComponents[activeComponent]) ? 
            React.cloneElement(allComponents[activeComponent], componentProps) : 
            allComponents[activeComponent] || (
              <div className="text-center py-10">Component not found</div>
            )
          }
        </div>
      </div>

      {isMobile && <BottomBar setActiveComponent={handleSetActiveComponent} />}

      {showCampaignPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CreateCampaign onClose={() => setShowCampaignPopup(false)} />
          </div>
        </div>
      )}
=======
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
>>>>>>> e6c1b235cab7c31ac2ebba12b3189200702a1830
    </div>
  );
}
