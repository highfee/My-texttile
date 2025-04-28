import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Pricingplans from "./Pricingplans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRegisterStore } from "@/store/registerStore";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";

const codeSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
});

const Finalizeaccount = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [resendTimer, setResendTimer] = useState(24);
  const [errorMessage, setErrorMessage] = useState("");

  const { UserData } = useRegisterStore();

  const confirmCodeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/users/activate/", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data["response status"] === "success") {
        setShowCreateAccount(true);
      } else {
        setError(data["response description"] || "Registration failed");
      }
    },
    onError: (error) => {
      setError(error.message || "Registration failed. Please try again.");
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(codeSchema),
  });

  const handleContinue = async (data) => {
    const res = {
      code: data.code,
      user_id: UserData.id,
      resend_code: false,
    };

    confirmCodeMutation.mutate(res);
  };

  const handleResendCode = () => {
    // Logic to resend the code
    setResendTimer(24); // Reset the timer
    // Call your API to resend the code
  };

  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  if (showCreateAccount) {
    return <Pricingplans onBack={() => setShowCreateAccount(false)} />;
  }

  return (
    <div className="flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] mx-auto">
      {/* Left Section */}
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        {/* <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer"
            onClick={onBack}
          />
        </div> */}
        <div className="py-2 lg:py-8 md:py-10">
          <p className="font-bold text-black text-[12px] lg:text-[25px]">
            Let’s finalise your account
          </p>
          <p className="text-[#121212] opacity-[0.44] text-[10px] sm:text-[14px]">
            Enter the code we sent to your email and phone number.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleContinue)}
          className="flex flex-col gap-1 lg:gap-4 w-full"
        >
          {/* Code Input */}
          <div className="w-full">
            <p className="font-bold py-2">Code</p>
            <div className="flex items-center px-2 sm:px-3 py-2 border border-[#12121270] rounded-lg">
              <input
                type="text"
                {...register("code")}
                className="w-full px-2 lg:py-2 focus:outline-none text-sm font-sans"
              />
            </div>
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <div className="w-full py-2">
            <button
              type="submit"
              className="w-full bg-bluebutton text-white py-1 lg:py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <p>Submit</p>
            </button>
            <p className="text-[#121212] opacity-[0.44] text-[10px] sm:text-[14px] mt-2">
              Didn’t get a code?{" "}
              {resendTimer > 0 ? (
                <span className="font-bold">{resendTimer} seconds</span>
              ) : (
                <span
                  className="font-bold text-blue-500 cursor-pointer"
                  onClick={handleResendCode}
                >
                  Resend
                </span>
              )}
            </p>
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

export default Finalizeaccount;
