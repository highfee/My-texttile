import { Home, ShoppingCart, List, Wallet } from 'lucide-react';

const BottomBarAdmin = ({ onItemClick, activeItem }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center p-2">
        {/* Dashboard */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Dashboard")}
        >
          <Home className={`h-6 w-6 ${activeItem === "Dashboard" ? "text-bluebutton" : "text-graycolor"}`} />
          <span className={`text-xs ${activeItem === "Dashboard" ? "text-bluebutton" : "text-graycolor"}`}>Dashboard</span>
        </div>

        {/* Creator */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Creator")}
        >
          <ShoppingCart className={`h-6 w-6 ${activeItem === "Creator" ? "text-bluebutton" : "text-graycolor"}`} />
          <span className={`text-xs ${activeItem === "Creator" ? "text-bluebutton" : "text-graycolor"}`}>Creator</span>
        </div>

        {/* Campaign */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Campaigns")}
        >
          <List className={`h-6 w-6 ${activeItem === "Campaigns" ? "text-bluebutton" : "text-graycolor"}`} />
          <span className={`text-xs ${activeItem === "Campaigns" ? "text-bluebutton" : "text-graycolor"}`}>Campaign</span>
        </div>

        {/* Settings */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Settings")}
        >
          <Wallet className={`h-6 w-6 ${activeItem === "Settings" ? "text-bluebutton" : "text-graycolor"}`} />
          <span className={`text-xs ${activeItem === "Settings" ? "text-bluebutton" : "text-graycolor"}`}>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBarAdmin;