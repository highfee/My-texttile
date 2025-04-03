import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import Pricingplans from "./Pricingplans";

const Securitylayer = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPricingPlans, setShowPricingPlans] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (value) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if passwords match
    if (confirmPassword && newPassword !== confirmPassword) {
      setError("Your password do not match, please reenter your password correctly.");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword !== password) {
      setError("Your password do not match, please reenter your password correctly.");
    } else {
      setError("");
    }
  };

  const handleContinue = () => {
    setShowPricingPlans(true);
  };

  if (showPricingPlans) {
    console.log("Rendering PricingPlans component"); // Debugging: Check if this is logged
    return <Pricingplans onBack={() => setShowPricingPlans(false)} />;
  }

  return (
    <div className="flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] lg:h-[572px]">
      <div className="flex flex-col items-start px-2 lg:px-6 py-4 lg:py-8 w-full md:w-1/2">
        <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer"
            onClick={onBack}
          />
        </div>
        <div className="py-2 lg:py-4">
          <p className="font-bold text-black text-[14px] lg:text-[25px]">
            Let’s finalise your account
          </p>
          <p className="text-[#121212] opacity-[0.44] text-[10px] lg:text-[14px]">
            Add a security layer to your account
          </p>
        </div>
        <div className="flex flex-col gap-2  w-full">
          <div className="w-full">
            <p className="font-bold py-2">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-1 lg:py-3 focus:outline-none text-sm font-sans pr-10 border border-gray-300 rounded-lg"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <LuEyeClosed />}
              </span>
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold py-2">Confirm Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-1 lg:py-3 focus:outline-none text-sm font-sans pr-10 border border-gray-300 rounded-lg"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <LuEyeClosed />}
              </span>
            </div>
          </div>
          {error && (
            <p className="text-[#FF5789] text-[10px] lg:text-[14px]">
              {error}
            </p>
          )}
          <p className="text-[#121212] text-[10px] lg:text-[14px]">
            Your password should include a combination of letters, numbers, and special symbols.
          </p>
          <div className="w-full py-2">
            <button
              className="w-full bg-bluebutton text-white py-1 lg:py-2  rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={handleContinue}
            >
              <p>Submit</p>
            </button>
            <p className="text-[#121212] opacity-[0.44] text-[10px] lg:text-[14px] mt-2">
              Didn’t get a code? Resend in{" "}
              <span className="font-bold">24 seconds</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/3 md:w-1/2">
        <img
          src="/signup/login.png"
          alt="Person using computer"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Securitylayer;