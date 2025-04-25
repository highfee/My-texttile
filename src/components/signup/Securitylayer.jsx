import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import Pricingplans from "./Pricingplans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterStore } from "@/store/registerStore";
import Finalizeaccount from "./Finalizeaccount";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must include letters, numbers, and special symbols"
  );

const schema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

const Securitylayer = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPricingPlans, setShowPricingPlans] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setShowPricingPlans(true);
  };

  if (showPricingPlans) {
    return <Finalizeaccount onBack={() => setShowPricingPlans(false)} />;
    // return <Pricingplans onBack={() => setShowPricingPlans(false)} />;
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <div className="w-full">
            <p className="font-bold py-2">Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full px-4 py-1 lg:py-3 focus:outline-none text-sm font-sans pr-10 border border-gray-300 rounded-lg"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <LuEyeClosed />}
              </span>
            </div>
            {errors.password && (
              <p className="text-[#FF5789] text-[10px] lg:text-[14px]">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <p className="font-bold py-2">Confirm Password</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="w-full px-4 py-1 lg:py-3 focus:outline-none text-sm font-sans pr-10 border border-gray-300 rounded-lg"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <LuEyeClosed />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-[#FF5789] text-[10px] lg:text-[14px]">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <p className="text-[#121212] text-[10px] lg:text-[14px]">
            Your password should include a combination of letters, numbers, and
            special symbols.
          </p>
          <div className="w-full py-2">
            <button
              type="submit"
              className="w-full bg-bluebutton text-white py-1 lg:py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <p>Submit</p>
            </button>
            <p className="text-[#121212] opacity-[0.44] text-[10px] lg:text-[14px] mt-2">
              Didn’t get a code? Resend in{" "}
              <span className="font-bold">24 seconds</span>
            </p>
          </div>
        </form>
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
