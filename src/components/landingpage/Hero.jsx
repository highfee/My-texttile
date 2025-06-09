import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import useAuthStore from "@/store/authStore";
import { useState } from "react";
import Login from "../login/Login";
import Loginoptions from "../signup/Loginoptions";
import { FiX } from "react-icons/fi";

const Hero = () => {
  const { session, clearSession } = useAuthStore();

  const [showLogin, setShowLogin] = useState(false);

  console.log(session);
  return (
    <div className="w-full  lg:px-24 px-4">
      <div className="  h-fit bg-landing rounded-3xl bg-cover px-4 ">
        <div className="text-center ">
          <h1 className="hidden md:block text-[40px] font-bold text-black mb-4  pt-16">
            Your Vision, Your Brand.
          </h1>
          <h1 className="md:hidden text-[28px] font-semibold text-black   pt-16">
            Unleash Your Creativity Sell Your Vision
          </h1>
          <p className="text-[#12121270]  lg:text-lg  text-sm">
            MyTextil empowers creators to design, sell, and scale with ease.
            From print-on-demand
            <br className="hidden md:block" /> tools to advanced analytics, we
            provide everything you need to build your creative empire.
          </p>
          <div className="py-6">
            <Button
              // href={"/dashboard/home"}
              className="bg-[#016FDE] text-white px-6 py-2 rounded-full"
              onClick={() => {
                if (session) {
                  window.location.href = "/dashboard/home";
                } else {
                  clearSession();
                  setShowLogin(true);
                }
              }}
              as={Link}
            >
              Start Creating
            </Button>
          </div>
        </div>
        <div className="relative  flex flex-col items-center">
          <div className="w-full flex justify-center items-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src="/dashboard-header.svg"
                alt="Design Interface Preview"
                className="w-[835px] h-auto"
              />
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <div className="hidden md:block rounded-lg overflow-hidden h-[520px]">
              <img
                src="/dashboardimg.png"
                alt="Design Interface Preview"
                className="w-full "
              />
            </div>
            <div className="lg:hidden rounded-lg overflow-hidden">
              <img
                src="/landingpage/mobilehome.svg"
                alt="Design Interface Preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
