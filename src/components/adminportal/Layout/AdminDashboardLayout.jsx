import React, { useState, Children } from "react";
import AdminSideBar from "./AdminSideBar";
import AdminHeader from "./AdminHeader";
import useMediaQuery from "@/components/hook/usemediaquery";
import BottomBarAdmin from "../BottomBarAdmin";

export default function AdminDashboardLayout({ children }) {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [componentProps, setComponentProps] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-sans tracking-[-1px]">
      <div className={`fixed lg:static inset-y-0 left-0 z-20 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-300`}>
        <AdminSideBar 
          setActiveComponent={handleSetActiveComponent}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
      </div>

      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex-1 flex flex-col bg-[#fffbfbcc]">
        <AdminHeader
          toggleSidebar={toggleSidebar}
          setActiveComponent={handleSetActiveComponent}
          currentComponent={activeComponent}
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex-1 p-4 overflow-y-auto pb-16"> 
          {React.isValidElement(allComponents[activeComponent]) ? 
            React.cloneElement(allComponents[activeComponent], componentProps) : 
            allComponents[activeComponent] || (
              <div className="text-center py-10">Component not found</div>
            )
          }
        </div>
      </div>

      {isMobile && (
        <BottomBarAdmin 
          onItemClick={handleSetActiveComponent} 
          activeItem={activeComponent}
        />
      )}
    </div>
  );
}