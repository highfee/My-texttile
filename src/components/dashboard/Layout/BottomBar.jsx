import { Home, ShoppingCart, PlusSquare, List, Wallet } from 'lucide-react';

const BottomBar = ({ onItemClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center p-2">
        {/* Home */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Home")} // Trigger onItemClick with "Home"
        >
          <Home className="h-6 w-6 text-gray-700" />
          <span className="text-xs text-gray-700">Home</span>
        </div>

        {/* Purchase */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Purchase")} // Trigger onItemClick with "Purchase"
        >
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          <span className="text-xs text-gray-700">Purchase</span>
        </div>

        {/* Plus */}
        <div
          className="flex flex-col items-center cursor-pointer bg-bluebutton rounded-full px-6 py-4"
          onClick={() => onItemClick("Add")} // Trigger onItemClick with "Add"
        >
          <span className="text-white text-2xl">+</span>
        </div>

        {/* Listing */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Listing")} // Trigger onItemClick with "Listing"
        >
          <List className="h-6 w-6 text-gray-700" />
          <span className="text-xs text-gray-700">Listing</span>
        </div>

        {/* Payout */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onItemClick("Payout")} // Trigger onItemClick with "Payout"
        >
          <Wallet className="h-6 w-6 text-gray-700" />
          <span className="text-xs text-gray-700">Payout</span>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;