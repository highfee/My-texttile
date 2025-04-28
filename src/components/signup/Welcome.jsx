import React, { useState } from "react";
import Login from "../login/Login";

export default function Welcome({ onBack }) {
  const [showLogin, setShowLogin] = useState(false); // State to toggle login component

  // If showLogin is true, render the Login component
  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="fixed inset-0 flex flex-col h-fit items-center justify-center z-50 bg-white w-[340px] md:w-[700px] lg:w-[850px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-lg">
      {/* Confetti images */}
      <img
        src="/landingpage/Group2.png"
        alt="Confetti"
        className="absolute top-0 left-0 w-[50%] h-auto"
      />
      <img
        src="/landingpage/Group2.png"
        alt="Confetti"
        className="absolute top-0 right-0 w-[50%] h-auto transform scale-x-[-1]"
      />

      {/* Text Section */}
      <div className="text-center py-6 lg:py-11">
        <h2 className="text-[20px] lg:text-[40px] font-bold">
          Congratulations
        </h2>
        <p className="text-graycolor opacity-[0.44] text-[10px] lg:text-[13px]">
          Bring your Prints dreams to reality with Owneet
        </p>
      </div>

      {/* Center Icon */}
      <div className="flex items-center justify-center rounded-full">
        <img
          src="/landingpage/Clippathgroup.png"
          alt="Icon"
          className="w-1/2 lg:w-28"
        />
      </div>

      {/* Celebration Image */}
      <img
        src="/landingpage/group.png"
        alt="Celebration"
        className="w-[607px] max-w-full h-auto"
      />

      {/* Skip Button to show Login Component */}
      <button
        onClick={() => setShowLogin(true)} // Set showLogin to true on click
        className="absolute top-4 right-4 text-graycolor opacity-[0.44] cursor-pointer text-sm"
      >
        Skip
      </button>
    </div>
  );
}
