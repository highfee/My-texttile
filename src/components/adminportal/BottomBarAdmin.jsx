
import { useRouter } from 'next/router';
import {
  LayoutDashboardIcon,
  Users,
} from "lucide-react";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
const BottomBarAdmin = () => {
  const router = useRouter();
  const currentPage = router.pathname.split('/adminportal/').pop() || 'dashboard';
  const bottomBarItems = [
    { 
      name: "Dashboard", 
      icon: LayoutDashboardIcon, 
      path: "dashboard",
      displayName: "Dashboard"
    },
    { 
      name: "Creator", 
      icon: Users, 
      path: "creator",
      displayName: "Creator"
    },
    { 
      name: "Campaigns", 
      icon: HiOutlineMegaphone, 
      path: "campaigns",
      displayName: "Campaign"
    },
    { 
      name: "Settings", 
      icon: VscSettings, 
      path: "settings",
      displayName: "Settings"
    },
  ];

  const handleItemClick = (path) => {
    router.push(`/adminportal/${path}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-30">
      <div className="flex justify-around items-center p-2">
        {bottomBarItems.map((item) => {
          const isActive = currentPage === item.path;
          const Icon = item.icon;
          
          return (
            <div
              key={item.path}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleItemClick(item.path)}
            >
              <Icon className={`h-6 w-6 ${isActive ? "text-bluebutton" : "text-graycolor"}`} />
              <span className={`text-xs ${isActive ? "text-bluebutton" : "text-graycolor"}`}>
                {item.displayName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BottomBarAdmin;