import { useState } from "react";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { IoArrowRedoOutline } from "react-icons/io5";
import EditProfile from "@/components/dashboard/sidebarcomponents/Settings/EditProfile";

const index = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="px-0 lg:px-6">
      <div className="p-0 lg:p-1">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center border-b pb-2 lg:bg-white bg-bluebutton rounded-lg p-2">
          <div className="lg:text-graycolor text-white">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="opacity-[0.44] text-sm">Help us know you better.</p>
          </div>
          <div className="lg:text-right text-left lg:text-graycolor text-white">
            <p className="flex lg:items-center font-medium lg:justify-end space-x-1">
              <span>Share affiliate link</span>
              <IoArrowRedoOutline />
            </p>
            <a
              href="https://www.example.com/adventure-on-the-coastline"
              className="lg:text-[#016FDE80] underline lg:text-md text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.example.com/adventure-on-the-coastline
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center space-x-4">
            <img
              src="/dashboard/Profile-pic.svg"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">Rafin Ahmed</h3>
              <div className="py-2 text-graycolor">
                <p className="text-sm opacity-[0.44]">Project Manager</p>
                <p className="text-sm opacity-[0.44]">Leeds, United Kingdom</p>
                <p className="text-sm opacity-[0.44]">UserID: aae44746</p>
              </div>
            </div>
          </div>
          <button
            className="flex items-center space-x-1 text-gray-600 hover:text-black border px-3 py-1 rounded-full"
            onClick={() => setIsEditOpen(true)}
          >
            <FiEdit2 size={14} />
            <span>Edit</span>
          </button>
        </div>

        <div className="py-6 border-b">
          <h4 className="text-md font-semibold">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-graycolor font-medium">
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">First Name:</span> Rafin
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Last Name:</span> Ahmed
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Email:</span> Rafinahmed@babs.com
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Phone Number:</span> (217) 555-0113
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Bio:</span> Project Manager
            </p>
          </div>
        </div>

        <div className="py-6">
          <h4 className="text-md font-semibold">Address</h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-graycolor font-medium">
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Street:</span> 7529 E. Pecan St.
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">State:</span> Austin
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Postal Code:</span> 45785
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Country:</span> USA
            </p>
            <p className="flex flex-col">
              <span className="font-medium opacity-[0.44]">Time Zone:</span> Eastern Standard Time
            </p>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </div>
  );
};

export default index;
