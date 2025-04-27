"use client";

import { useState } from "react";
import LiveChat from "./LiveChat"; // Import the new component

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);

  if (chatOpen) {
    return <LiveChat />;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white text-black rounded-lg shadow-lg w-80 overflow-hidden">
              <div className="bg-black text-white p-2 text-center">
        <div className="flex items-center ">
          <span className="text-white font-bold text-lg">M</span>
          <span className="text-xs text-white">My-Store</span>
        </div>
          <h3 className="text-2xl font-semibold mb-2">Welcome!</h3>
          <p className="text-sm">How can we help you?</p>
          <p className=" text-sm py-8">
            We have a dedicated Team of experts, ready to solve your problems.
          </p>
        </div>
        <div className="p-6 flex flex-col items-center text-center">
          <div className="flex -space-x-4 py-12">
            <img className="w-14 h-14 rounded-full" src="/creatorstore/Ellipse1.png" alt="Avatar 1" />
            <img className="w-14 h-14 rounded-full" src="/creatorstore/Ellipse2.png" alt="Avatar 2" />
            <img className="w-14 h-14 rounded-full" src="/creatorstore/Ellipse1.png" alt="Avatar 3" />
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Average response time is 2 minutes
          </p>
          <button
            className="px-4 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setChatOpen(true)}
          >
            Start conversation Now
          </button>
        </div>
      </div>
    </div>
  );
}
