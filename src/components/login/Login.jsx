import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";
import { authService } from "@/lib/authService";

const Login = () => {
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [passwordValid, setPasswordValid] = useState(false); // State for password validation

  const [error, setError] = useState(false); // State for error message

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      router.push("/adminportal/dashboard");
    }
    // else {
    //   router.push("/dashboard/home");
    // }
  };

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/users/login/", data);
      authService.setSession(response.data["response data"]);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        router.push("/dashboard/home");
      } else {
        setError(data["response description"] || "Login failed");
      }
    },
    onError: (error) => {
      setError(error.message || "Login failed. Please try again.");
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    if (data.email === "admin@gmail.com" && data.password === "admin") {
      router.push("/adminportal/dashboard");
    } else {
      const res = {
        email: data.email,
        password: data.password,
      };
      loginMutation.mutate(res);
    }
  };

  return (
    <div className="flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] bg-white">
      {/* Left Section (Login Form) */}
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <p>
          {error && (
            <p className="text-[#FF5789] text-[10px] lg:text-[14px] py-2">
              {JSON.stringify(error)}
            </p>
          )}
        </p>
        <div className="py-4 lg:py-8">
          <p className="font-bold text-black text-[16px] lg:text-[30px]">
            Login
          </p>
          <p className="text-[#121212] text-[8px] md:text-[14px] lg:text-[14px]">
            Welcome back, please Login
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col gap-4 w-full">
            {/* Email Input */}
            <div className="w-full">
              <p className="font-bold py-2">Email</p>
              <input
                type="email"
                placeholder="example@email.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1 lg:py-2 border border-[#12121270] rounded-lg focus:outline-none"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="w-full">
              <p className="font-bold py-2">Password</p>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  // value={password}
                  // onChange={handlePasswordChange}
                  className="w-full px-4 py-1 lg:py-3 focus:outline-none text-sm font-sans pr-10 border border-gray-300 rounded-lg"
                  {...register("password")}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {/* Password validation message */}
              <p
                className={`text-sm ${
                  passwordValid ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordValid
                  ? "Password correct"
                  : "Password must be at least 8 characters"}
              </p>
            </div>

            {/* Login Button */}
            <button className="w-full text-center bg-bluebutton hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 ">
              {loginMutation.isPending && (
                <LoaderCircle className="animate-spin transition-all" />
              )}
              Login
            </button>
          </div>
        </form>
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
