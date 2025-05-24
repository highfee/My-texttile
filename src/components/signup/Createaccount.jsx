import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { US, IN, GB, CA, AU, FR, DE, JP } from "country-flag-icons/react/3x2";
import Reference from "./Reference";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegisterStore } from "@/store/registerStore";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Createaccount = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const { setPhoneNumber } = useRegisterStore();

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
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setPhoneNumber(data.phoneNumber);
    setShowCreateAccount(true);
  };

  if (showCreateAccount) {
    return <Reference onBack={() => setShowCreateAccount(false)} />;
  }

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
          autoComplete="off"
          className="flex flex-col gap-4 w-full"
        >
          <div className="w-full">
            <p className="font-bold py-2">Phone Number</p>

            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="ua"
                  value={field.value}
                  onChange={field.onChange}
                  className="min-w-full h-9"
                  inputClassName="w-full py-2"
                />
              )}
            />
            {/* {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )} */}
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
