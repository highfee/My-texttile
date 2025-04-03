import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Securitylayer from "./Securitylayer";

const Finalizeaccount = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleContinue = () => {
    setShowCreateAccount(true);
  };

  if (showCreateAccount) {
    return <Securitylayer onBack={() => setShowCreateAccount(false)} />;
  }

  return (
    <div className="flex flex-row items-stretch  rounded-lg shadow-md overflow-hidden  sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] mx-auto">
      {/* Left Section */}
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer"
            onClick={onBack} 
          />
        </div>
        <div className="py-2 lg:py-8 md:py-10">
          <p className="font-bold text-black text-[12px] lg:text-[25px]">
            Let’s finalise your account
          </p>
          <p className="text-[#121212] opacity-[0.44] text-[10px] sm:text-[14px]">
            Enter the code we sent to your email and phone number.
          </p>
        </div>
        <div className="flex flex-col gap-1 lg:gap-4 w-full">
          {/* Code Input */}
          <div className="w-full">
            <p className="font-bold py-2">Code</p>
            <div className="flex items-center px-2 sm:px-3 py-2  border border-[#12121270] rounded-lg">
              <input
                type="password"
                className="w-full px-2  lg:py-2  focus:outline-none text-sm font-sans"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full py-2">
            <button
              onClick={handleContinue}
              className="w-full bg-bluebutton text-white py-1 lg:py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <p>Submit</p>
            </button>
            <p className="text-[#121212] opacity-[0.44] text-[10px] sm:text-[14px] mt-2">
              Didn’t get a code? Resend in{" "}
              <span className="font-bold">24 seconds</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
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

export default Finalizeaccount;