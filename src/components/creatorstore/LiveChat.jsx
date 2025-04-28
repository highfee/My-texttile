"use client";

import { ArrowDown } from "lucide-react"; // Using lucide-react for icons
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function LiveChat() {
  const [goBack, setGoBack] = useState(false);

  if (goBack) {
    // Dynamically import ChatWidget when needed
    const ChatWidget = require("./ChatWidget").default;
    return <ChatWidget />;
  }

  return (
    <div className="fixed bottom-6 right-6">
      <div className="bg-white text-black rounded-lg shadow-lg w-80 h-[500px] flex flex-col">
      
        {/* Chat Header */}
        <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center ">
          <span className="text-white font-bold text-lg">M</span>
          <span className="text-sm text-white">My-Store</span>
        </div>
          
          <h3 className="text-lg font-semibold text-center">Jessica B is <span className="text-green-400 text-xs">live</span></h3>
          
          <button onClick={() => setGoBack(true)}>
            <IoIosArrowDown className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          <div className="text-sm bg-gray-100 text-black p-2 rounded-lg max-w-xs">
            Hello
          </div>
          <div className="text-sm bg-gray-200 text-black p-2 rounded-lg max-w-xs">
            We are still waiting for your response. Please make a selection from the options provided.
          </div>
          <div className="text-sm bg-black text-white p-2 rounded-lg max-w-xs self-end">
            Hi, sorry for the delay
          </div>
          <div className="text-sm bg-black text-white p-2 rounded-lg max-w-xs self-end">
            I ordered some dress from the past two weeks now and I'm yet to get a confirmation
          </div>
          {/* Receipt Image */}
          <img src="/receipt-placeholder.png" alt="Receipt" className="w-32 rounded-lg" />
        </div>

        {/* Chat Input */}
        <div className="p-2">
          <input
            type="text"
            placeholder="Message"
            className="w-full p-2 border rounded-lg text-black"
          />
        </div>
      </div>
    </div>
  );
}
