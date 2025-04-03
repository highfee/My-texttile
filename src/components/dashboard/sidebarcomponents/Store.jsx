import { useState } from "react";
import Image from "next/image";
import { IoIosLink } from "react-icons/io";
export default function Store() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="px-10">
      <div className="border p-2 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <img src="/dashboard/appearance/Modelight.png" className="" />
          <div>
            <a href="#" className="text-blue-600 underline">
              https://www.my-store-1029a69b.com
            </a>
            <h2 className="text-xl font-bold">my-store-1029a69b</h2>
            <p className="opacity-[0.44]">
              Welcome to your custom print-on-demand store! Here
            </p>
          </div>
          <div className="flex flex-col gap-2 ml-auto">
            <button
              className="bg-bluebutton text-white px-4 py-2 rounded"
              onClick={() => setActiveComponent("setup")}
            >
              Setup store
            </button>
            <button
              className="bg-[#016FDE1A] text-graycolor px-4 py-2 rounded"
              onClick={() => setActiveComponent("viewSites")}
            >
              View stores
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 mt-4">
        <div className="border p-4 rounded-md text-center space-y-4">
          <div className="flex justify-center">
            <IoIosLink className="text-3xl" />
          </div>
          <p className="font-bold">Purchase new domain</p>
          <p className="opacity-[0.44]">$12.9/year</p>
          <button
            className="bg-bluebutton text-white px-4 py-2 rounded mt-2"
            onClick={() => setActiveComponent("domain1")}
          >
            Activate
          </button>
        </div>
        <div className="border p-4 rounded-md text-center space-y-4">
          <div className="flex justify-center">
            <IoIosLink className="text-3xl" />
          </div>
          <p className="font-bold">Purchase new domain</p>
          <p className="opacity-[0.44]">$12.0/year</p>
          <button
            className="bg-bluebutton text-white px-4 py-2 rounded mt-2"
            onClick={() => setActiveComponent("domain2")}
          >
            Activate
          </button>
          <p className="opacity-[0.44] text-xs">
            *Free connection when you buy a domain through Mytextil
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-left">Desktop View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>
          <div className="flex justify-center py-4">
            <img
              src="/dashboard/store/desktop.png"
              alt="Desktop View"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-left">Mobile View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>
          <div className="flex justify-center py-4">
            <img
              src="/dashboard/store/mobile.png"
              alt="Mobile View"
              width={300}
              height={500}
            />
          </div>
        </div>
      </div>

      {activeComponent && (
        <div className="p-4 border rounded bg-gray-100 mt-4 text-center">
          Component: {activeComponent} is displayed.
        </div>
      )}
    </div>
  );
}
