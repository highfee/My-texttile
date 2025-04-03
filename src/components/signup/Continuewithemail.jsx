import React, { useState } from "react";
import { Mail } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Createaccount from "./Createaccount"; // Import the Createaccount component

const Continuewithemail = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false); // State to control Createaccount visibility

  // Function to handle "Continue" button click
  const handleContinue = () => {
    setShowCreateAccount(true); // Set showCreateAccount to true to render Createaccount
  };

  // If showCreateAccount is true, render the Createaccount component
  if (showCreateAccount) {
    return <Createaccount onBack={() => setShowCreateAccount(false)} />;
  }

  return (
    <div className="flex flex-row items-stretch  rounded-lg shadow-md overflow-hidden  sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] ">
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer" // Add cursor-pointer for better UX
            onClick={onBack} // Go back to LoginOptions
          />
        </div>
        <div className="py-4 lg:py-12">
          <p className="font-bold text-black text-[16px] lg:text-[30px]">Continue with email</p>
          <p className="text-[#121212] text-[8px] md:text-[14px] lg:text-[14px]">
            We’ll check if you have an account with us, and help create one for
            you
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full ">
            <p className="font-bold py-2">Email</p>
            <input
              type="email"
              placeholder="Enter your email here"
              className="w-full px-2 py-1 lg:py-2 border border-[#12121270] rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full py-2">
            <button
              onClick={handleContinue} 
              className="w-full bg-bluebutton text-white py-1 lg:py-2 rounded-lg"
            >
              <p>Continue</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img
          src="/signup/login.png"
          alt="Person using computer"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Continuewithemail;