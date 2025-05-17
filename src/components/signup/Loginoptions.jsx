import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TiSocialFacebook } from "react-icons/ti";
import Continuewithemail from "./Continuewithemail"; // Import the Continuewithemail component
import { Mail } from "lucide-react";
import Link from "next/link";
import Login from "../login/Login";

const Loginoptions = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showContinueWithEmail, setShowContinueWithEmail] = useState(false);

  const [showLogin, setShowLogin] = useState(false); // State to toggle login component

  // If showLogin is true, render the Login component
  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  const handleContinueWithEmail = () => {
    setShowContinueWithEmail(true);
  };

  return (
    <div className="flex flex-row items-stretch bg-white rounded-lg shadow-md overflow-hidden w-[90%] sm:w-[600px] md:w-[700px] lg:w-[850px] h-auto sm:h-[400px] md:h-[450px] lg:h-[572px] mx-auto">
      {!showContinueWithEmail ? (
        <>
          <div className="flex flex-col items-start px-2 sm:px-6 py-6 sm:py-8 md:py-10 w-full md:w-1/2">
            <h2 className="text-base text-[11px] md:text-xl lg:text-2xl font-bold">
              Log in or sign up in seconds
            </h2>
            <p className="text-[#121212] text-[8px]  md:text-[14px] lg:text-[16px]  ">
              The platform is coming Live July 2025! Stay informed - sign up for
              our{" "}
              <Link href="/newsletter" className=" text-bluebutton">
                newsletter
              </Link>
              .
            </p>
            <p className="text-[#121212] text-[8px] md:text-[14px] lg:text-[16px] font-bold">
              (It's free)
            </p>
            <div className="w-full space-y-2 sm:space-y-3 py-4 sm:py-6 md:py-16 px-1 sm:px-4 mt-2">
              <button className="flex items-center justify-start w-full px-2 sm:px-3 py-1 sm:py-2 border border-[#12121270] rounded-lg">
                <span className="flex items-center justify-center w-5 sm:w-6">
                  <FcGoogle className="h-4 sm:h-5 w-4 sm:w-5" />
                </span>
                <span className="flex-1 text-center text-[8px] md:text-[14px] lg:text-[16px] font-semibold">
                  Continue with Google
                </span>
              </button>

              <button className="flex items-center justify-start w-full px-2 sm:px-3 py-1 sm:py-2 border border-[#12121270] rounded-lg">
                <span className="flex items-center justify-center w-5 sm:w-6">
                  <TiSocialFacebook className="h-4 sm:h-5 w-4 sm:w-5 bg-[#1877F2] rounded-full text-white" />
                </span>
                <span className="flex-1 text-center text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-semibold">
                  Continue with Facebook
                </span>
              </button>

              <button
                onClick={handleContinueWithEmail}
                className="flex items-center justify-start w-full px-2 sm:px-3 py-1 sm:py-2 border border-[#12121270] rounded-lg"
              >
                <span className="flex items-center justify-center w-5 sm:w-6">
                  <Mail className="h-4 sm:h-5 w-4 sm:w-5" />
                </span>
                <span className="flex-1 text-center text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-semibold">
                  Continue with email
                </span>
              </button>

              {/*  */}
              <p
                onClick={() => setShowLogin(true)}
                className="text-bluebutton text-[8px] sm:text-[10px] md:text-[14px] lg:text-[16px] font-semibold cursor-pointer"
              >
                Already have an account? Login
              </p>
            </div>

            <div className="mt-2 sm:mt-4 text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] text-gray-500">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="appearance-none h-4 sm:h-5 w-4 sm:w-5 border-2 border-blue-500 rounded-md checked:bg-white cursor-pointer"
                  />
                  {isChecked && (
                    <div className="absolute inset-0 flex items-center justify-center pb-1 pointer-events-none">
                      <div className="h-2 sm:h-3 w-2 sm:w-3 bg-blue-500 rounded-sm"></div>
                    </div>
                  )}
                </div>
                <label
                  htmlFor="terms"
                  className="text-[6px] md:text-[14px] lg:text-[15px]"
                >
                  By continuing, you agree to{" "}
                  <span className="font-bold">Mytextil</span> Terms of Use.
                </label>
              </div>
              <p className="mt-1">Read our Privacy Policy</p>
              <p>
                Want to be a creator sign up{" "}
                <Link
                  href="https://forms.gle/XxvEKrLzjzvPJJRu"
                  className="underline text-graycolor opacity-[0.70] font-semibold"
                >
                  Here
                </Link>
              </p>
              <p>
                Join our ambassador program{" "}
                <Link
                  href="https://forms.gle/Yv9qJTK6sGGVybXr9"
                  className="underline text-graycolor opacity-[0.70] font-semibold"
                >
                  Here
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/signup/login.png"
              alt="Person using computer"
              className="w-full h-full object-cover"
            />
          </div>
        </>
      ) : (
        <Continuewithemail onBack={() => setShowContinueWithEmail(false)} />
      )}
    </div>
  );
};

export default Loginoptions;
