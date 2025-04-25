import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Finalizeaccount from "./Finalizeaccount";
import Securitylayer from "./Securitylayer";

const Reference = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const handleContinue = () => {
    setShowCreateAccount(true);
  };

  // if (showCreateAccount) {
  //   return <Finalizeaccount onBack={() => setShowCreateAccount(false)} />;
  // }

  if (showCreateAccount) {
    return <Securitylayer onBack={() => setShowCreateAccount(false)} />;
  }
  return (
    <div className="flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] ">
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer"
            onClick={onBack}
          />
        </div>
        <div className="py-4 lg:py-12">
          <p className="font-bold text-black text-[12px] lg:text-[25px]">
            Were you referred by anyone?
          </p>
          <p className="text-[#121212] opacity-[0.44] text-[8px] md:text-[14px] lg:text-[14px]">
            Enter the code we sent to your email and phone number.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full ">
            <p className="font-bold py-2">
              Refferal Code{" "}
              <span className="text-[#121212] opacity-[0.44] text-[8px] md:text-[14px] lg:text-[14px] font-thin">
                Optional
              </span>
            </p>
            <div className="flex items-center px-1 border border-[#12121270] rounded-lg focus:outline-none">
              <input
                type="password"
                className=" px-2 py-1 lg:py-2 focus:outline-none text-sm font-sans"
              />
            </div>
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

export default Reference;
