import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { US, IN, GB, CA, AU, FR, DE, JP } from "country-flag-icons/react/3x2";
import Reference from "./Reference";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterStore } from "@/store/registerStore";

const Createaccount = ({ onBack }) => {
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const countries = [
    {
      code: "US",
      name: "United States",
      flag: <US className="w-5" />,
      prefix: "+1",
    },
    { code: "IN", name: "India", flag: <IN className="w-5" />, prefix: "+91" },
    {
      code: "GB",
      name: "United Kingdom",
      flag: <GB className="w-5" />,
      prefix: "+44",
    },
    { code: "CA", name: "Canada", flag: <CA className="w-5" />, prefix: "+1" },
    {
      code: "AU",
      name: "Australia",
      flag: <AU className="w-5" />,
      prefix: "+61",
    },
    { code: "FR", name: "France", flag: <FR className="w-5" />, prefix: "+33" },
    {
      code: "DE",
      name: "Germany",
      flag: <DE className="w-5" />,
      prefix: "+49",
    },
    { code: "JP", name: "Japan", flag: <JP className="w-5" />, prefix: "+81" },
  ];

  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setIsDropdownOpen(false);
  };

  const { setPassword } = useRegisterStore();

  const schema = z.object({
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." }),
    // .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleContinue = () => {
    setShowCreateAccount(true);
  };

  const onSubmit = (data) => {
    setPassword(data.phoneNumber);
    handleContinue();
  };

  if (showCreateAccount) {
    return <Reference onBack={() => setShowCreateAccount(false)} />;
  }

  const selectedCountryPrefix =
    countries.find((c) => c.code === selectedCountry)?.prefix || "";

  return (
    <div
      className={`flex flex-row items-stretch rounded-lg shadow-md overflow-hidden sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[772px] mx-auto ${
        errors.phoneNumber ? "border-red-500" : ""
      }`}
    >
      <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
        <div>
          <FaArrowLeftLong
            className="text-black cursor-pointer"
            onClick={onBack}
          />
        </div>
        <div className="py-4 lg:py-12">
          <p className="font-bold text-black text-[16px] lg:text-[30px]">
            Create your account
          </p>
          <p className="text-[#121212] text-[8px] md:text-[14px] lg:text-[14px]">
            We’ll check if you have an account with us, and help create one for
            you
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <p className="font-bold py-2">Phone Number</p>
            <div
              className={`flex items-center w-full border ${
                errors.phoneNumber ? "border-red-500" : "border-[#12121270]"
              } rounded-lg focus:outline-none`}
            >
              <div className="relative p-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  {countries.find((c) => c.code === selectedCountry)?.flag}
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {country.flag}
                        <span className="ml-2 text-sm">{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                placeholder={`${selectedCountryPrefix} (406) 555-0120`}
                className="w-full px-2 py-1 focus:outline-none text-sm font-sans"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="w-full py-2">
            <button
              type="submit"
              className="w-full bg-bluebutton text-white py-2 rounded-lg"
            >
              <p>Continue</p>
            </button>
          </div>
        </form>
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

export default Createaccount;
