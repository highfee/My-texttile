import { IoIosLink } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";

export default function MainStoreview({ setActiveComponent, onEditorOpen }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOverlay1, setShowOverlay1] = useState(false);

  const handleImageClick = (viewType) => {
    if (onEditorOpen) {
      onEditorOpen(viewType);
    } else {
      setActiveComponent({
        name: "StoreEditor",
        props: { initialView: viewType }
      });
    }
  };

  return (
    <div className="px-2 lg:px-10"style={{
      overflowY: "auto",
      scrollbarWidth: "none" /* Firefox */,
      msOverflowStyle: "none" /* IE and Edge */,
    }}
  >
    <style jsx global>{`
      ::-webkit-scrollbar {
        display: none;
      }
    `}</style>
      <div className="border p-2 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <img src="/dashboard/appearance/Modelight.png" alt="Store model" />
          <div>
            <a href="#" className="text-bluebutton underline">
              https://www.my-store-1029a69b.com
            </a>
            <h2 className="text-xl font-bold">my-store-1029a69b</h2>
            <p className="opacity-[0.44]">
              Welcome to your custom print-on-demand store! Here
            </p>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 lg:ml-auto">
            <button
              className="bg-bluebutton text-white px-4 py-2 rounded"
              onClick={() => setActiveComponent("editor")}
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
      
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 mt-4">
        <div className="border p-4 rounded-md text-center space-y-4">
          <div className="flex justify-center">
            <IoIosLink className="text-3xl" />
          </div>
          <p className="font-bold">Purchase new domain</p>
          <p className="opacity-[0.44]">$12.9/year</p>
          <button
            className="bg-bluebutton text-white px-4 py-2 rounded mt-2"
            onClick={() => setActiveComponent("Activate1")}
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
            onClick={() => setActiveComponent("Activate2")}
          >
            Activate
          </button>
          <p className="opacity-[0.44] text-xs">
            *Free connection when you buy a domain through Mytextil
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-10 mt-4">
        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-left">Desktop View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>
          <div
            className="relative flex justify-center py-4 cursor-pointer"
            onMouseEnter={() => setShowOverlay1(true)}
            onMouseLeave={() => setShowOverlay1(false)}
            onClick={() => handleImageClick("desktop")}
          >
            <img
              src="/dashboard/store/desktop.png"
              alt="Desktop View"
              className="w-full max-w-2xl border border-gray-200 rounded-lg"
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 transition-opacity ${
                showOverlay1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-white text-black p-3 rounded-full mb-2">
                <FiEdit2 className="text-lg" />
              </div>
              <h3 className="text-sm font-semibold">Edit Desktop View</h3>
              <p className="text-xs mt-1">Click to customize your store's desktop appearance</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-left">Mobile View</h3>
          <p className="opacity-[0.44]">Manage your earnings efficiently</p>
          <div
            className="relative flex justify-center py-4 cursor-pointer"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            onClick={() => handleImageClick("mobile")}
          >
            <img
              src="/dashboard/store/mobile.png"
              alt="Mobile View"
              className="w-full max-w-xs border border-gray-200 rounded-lg"
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4 transition-opacity ${
                showOverlay ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-white text-black p-3 rounded-full mb-2">
                <FiEdit2 className="text-lg" />
              </div>
              <h3 className="text-sm font-semibold">Edit Mobile View</h3>
              <p className="text-xs mt-1">Click to customize your store's mobile appearance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}