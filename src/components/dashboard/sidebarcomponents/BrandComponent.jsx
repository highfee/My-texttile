import React from "react";
import { Palette } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
const BrandComponent = () => {
  return (
    <div className="w-full flex flex-col gap-4 lg:px-10 px-4">
      <div className="relative w-full h-40">
        <img
          src="/dashboard/brandimg.png"
          alt="Brand"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center pl-6 text-white">
          <h2 className="text-2xl font-semibold">BRAND</h2>
          <p className="text-sm">Bring your imagination to life.</p>
        </div>
      </div>
      <div className="relative w-full hidden lg:flex">
        <img
          src="/dashboard/Product List.png"
          alt="Your Brand"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className=" absolute inset-0 flex flex-col justify-center p-6 text-white">
          <h3 className="text-xl font-semibold">Your Brand, Simplified</h3>
          <p className="text-sm w-1/2">
            your all-in-one place to store and manage your brand's essentials!
            Save your logo, colors, fonts, and more, so you can easily apply
            them across designs with just a click. Build consistently stunning
            creations while staying true to your brand identity.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center lg:p-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <span className="mr-2">
            <Palette />
          </span>{" "}
          Add Brand
        </button>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex  flex-row items-center space-x-2 border border-black rounded-lg p-1">
            <CiFilter className="text-[20px]" />
            <p className="text-sm lg:flex hidden">Filter</p>
            <IoIosArrowDown className="lg:flex hidden" />
          </div>
          <div className="flex border border-black rounded-md p-1">
            <IoGridOutline className="text-[20px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col py-4">
          <img src="/dashboard/olakit.png" className="rounded-lg"/>
          <p className="font-bold text-graycolor text-lg py-1">Ola Brand Kit</p>
          <p className="opacity-[0.44]">100% men brand</p>
        </div>
        <div className="flex flex-col py-4">
          <img src="/dashboard/brandkit2.png" className="rounded-lg"/>
          <p className="font-bold text-graycolor text-lg py-1">Quidquo Brand kit</p>
          <p className="opacity-[0.44]">Women T-shirt collection brand</p>
        </div>
      </div>
    </div>
  );
};
export default BrandComponent;
