import { Home, ShoppingCart, Plus, X, List, Wallet } from 'lucide-react';
import { useState } from 'react';

const BottomBar = ({ onItemClick, activeItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCenter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="bg-white px-6 py-4 rounded-md fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 z-50">
          <button className="bg-bluebutton text-white px-6 py-3 rounded-md w-48">
            New Project
          </button>
          <button className="bg-bluebutton text-white px-6 py-3 rounded-md w-48">
            Add Brand Kit
          </button>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
        <div className="flex justify-around items-center p-2">
          {/* Home */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onItemClick("Home")}
          >
            <Home 
              className={`h-6 w-6 ${activeItem === "Home" ? "text-bluebutton" : "text-gray-700"}`} 
            />
            <span className={`text-xs ${activeItem === "Home" ? "text-bluebutton font-medium" : "text-gray-700"}`}>
              Home
            </span>
          </div>

          {/* Purchase */}
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onItemClick("Purchase")}
          >
            <ShoppingCart 
              className={`h-6 w-6 ${activeItem === "Purchase" ? "text-bluebutton" : "text-gray-700"}`} 
            />
            <span className={`text-xs ${activeItem === "Purchase" ? "text-bluebutton font-medium" : "text-gray-700"}`}>
              Purchase
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer bg-bluebutton rounded-full px-4 py-4 "
            onClick={toggleCenter}
          >
            {isOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Plus className="text-white w-6 h-6" />
            )}
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onItemClick("Listing")}
          >
            <List 
              className={`h-6 w-6 ${activeItem === "Listing" ? "text-bluebutton" : "text-gray-700"}`} 
            />
            <span className={`text-xs ${activeItem === "Listing" ? "text-bluebutton font-medium" : "text-gray-700"}`}>
              Listing
            </span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onItemClick("Payout")}
          >
            <Wallet 
              className={`h-6 w-6 ${activeItem === "Payout" ? "text-bluebutton font-medium" : "text-gray-700"}`} 
            />
            <span className={`text-xs ${activeItem === "Payout" ? "text-bluebutton font-medium" : "text-gray-700"}`}>
              Payout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
