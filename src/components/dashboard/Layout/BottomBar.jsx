// components/dashboard/Layout/BottomBar.jsx
import { Home, ShoppingCart, Plus, X, List, Wallet } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

const BottomBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleCenter = () => setIsOpen(!isOpen);
  const navigateTo = (path) => router.push(`/dashboard/${path}`);

  return (
    <>
      {isOpen && (
        <div className="bg-white px-6 py-4 rounded-md fixed bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3 z-50 shadow-lg">
          <button
            className="bg-bluebutton text-white px-6 py-3 rounded-md w-48"
            onClick={() => navigateTo("design")}
          >
            New Project
          </button>
          <button
            className="bg-bluebutton text-white px-6 py-3 rounded-md w-48"
            onClick={() => navigateTo("brand")}
          >
            Add Brand Kit
          </button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
        <div className="flex justify-around items-center p-2">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigateTo("home")}
          >
            <Home
              className={`h-6 w-6 ${
                router.pathname.includes("home")
                  ? "text-bluebutton"
                  : "text-gray-700"
              }`}
            />
            <span
              className={`text-xs ${
                router.pathname.includes("home")
                  ? "text-bluebutton font-medium"
                  : "text-gray-700"
              }`}
            >
              Home
            </span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigateTo("purchase")}
          >
            <ShoppingCart
              className={`h-6 w-6 ${
                router.pathname.includes("purchase")
                  ? "text-bluebutton"
                  : "text-gray-700"
              }`}
            />
            <span
              className={`text-xs ${
                router.pathname.includes("purchase")
                  ? "text-bluebutton font-medium"
                  : "text-gray-700"
              }`}
            >
              Purchase
            </span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer bg-bluebutton rounded-full px-4 py-4 -mt-6"
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
            onClick={() => navigateTo("listing")}
          >
            <List
              className={`h-6 w-6 ${
                router.pathname.includes("listing")
                  ? "text-bluebutton"
                  : "text-gray-700"
              }`}
            />
            <span
              className={`text-xs ${
                router.pathname.includes("listing")
                  ? "text-bluebutton font-medium"
                  : "text-gray-700"
              }`}
            >
              Listing
            </span>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigateTo("payout")}
          >
            <Wallet
              className={`h-6 w-6 ${
                router.pathname.includes("payout")
                  ? "text-bluebutton"
                  : "text-gray-700"
              }`}
            />
            <span
              className={`text-xs ${
                router.pathname.includes("payout")
                  ? "text-bluebutton font-medium"
                  : "text-gray-700"
              }`}
            >
              Payout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
