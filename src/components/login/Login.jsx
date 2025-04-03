import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";

const Login = () => {
  const router = useRouter(); // Initialize router
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [passwordValid, setPasswordValid] = useState(false); // State for password validation

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword.length >= 8); // Example validation: at least 8 characters
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

 

  return (
    <div className="flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px]">
      {/* Left Section (Login Form) */}
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <div className="py-4 lg:py-8">
          <p className="font-bold text-black text-[16px] lg:text-[30px]">Login</p>
          <p className="text-[#121212] text-[8px] md:text-[14px] lg:text-[14px]">
            Welcome back, please Login
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {/* Email Input */}
          <div className="w-full">
            <p className="font-bold py-2">Email</p>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-2 py-1 lg:py-2 border border-[#12121270] rounded-lg focus:outline-none"
            />
          </div>

          {/* Password Input */}
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
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {/* Password validation message */}
            <p className={`text-sm ${passwordValid ? "text-green-500" : "text-red-500"}`}>
              {passwordValid ? "Password correct" : "Password must be at least 8 characters"}
            </p>
          </div>

          {/* Login Button */}
          <button
  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
  onClick={() => router.push("/dashboard")}
>
  Login
</button>
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

export default Login;
