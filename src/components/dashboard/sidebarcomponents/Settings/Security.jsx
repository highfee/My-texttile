import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Pencil, Trash } from "lucide-react";
import { GiCheckMark } from "react-icons/gi";
import PasswordConfig from "./PasswordConfig";
import { FiEdit2 } from "react-icons/fi";
import { encryptEmail } from "@/lib/utils";
import useAuthStore from "@/store/authStore";

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { session, clearSession } = useAuthStore();

  const devices = [
    {
      name: "Rafs Macbook pro",
      type: "Chrome Browser",
      status: "Active",
      time: "a month ago",
      location: "Montana",
      image: "/dashboard/security/apple.svg",
    },
    {
      name: "Windows OS",
      type: "Chrome Browser",
      status: "Inactive",
      time: "6 months ago",
      location: "Montana",
      image: "/dashboard/security/windows.svg",
    },
    {
      name: "Firefox on Android",
      type: "Mobile phone",
      status: "Active",
      time: "2 months ago",
      location: "NYC",
      image: "/dashboard/security/firefox.svg",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between bg-white shadow-md p-2 lg:p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              <circle
                className="text-gray-300 stroke-current"
                strokeWidth="4"
                cx="18"
                cy="18"
                r="16"
                fill="none"
              />
              <circle
                className="text-bluebutton stroke-current"
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset="30"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-blue-500">
              3/4
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Your account security is <strong>75%</strong>
            </p>
            <p className="text-xs text-gray-500">
              To bolster your account’s security, immediately enable two-factor
              authentication and create a robust, unique password.
            </p>
          </div>
        </div>
        <div className="lg:flex justify-end ">
          <button className="text-bluebutton text-sm font-semibold flex items-center bg-[#016FDE1A] p-1 px-4">
            Dismiss
          </button>
        </div>
      </div>
      <div className="py-8">
        <h3 className="text-lg font-semibold text-gray-700">Security</h3>
        <p className="text-sm text-gray-500">Enhance your account security</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
          <h4 className="text-md font-medium text-gray-700">Basic</h4>
          <p className="text-xs text-gray-500">
            Get emails to find out what’s going on when you’re not online. You
            can turn these off.
          </p>
        </div>
        <div>
          <div className="p-4 border rounded-lg ">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-sm opacity-[0.44] flex items-center gap-x-2">
                  ************{" "}
                  <span className="flex items-center gap-x-2  text-[#02D30F]">
                    {" "}
                    <GiCheckMark
                      className="bg-[#02D30F] text-white rounded-full p-1"
                      size={16}
                    />{" "}
                    Strong
                  </span>
                </p>
              </div>
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-black border px-3 py-1 rounded-full"
                onClick={() => setIsEditOpen(true)}
              >
                <FiEdit2 size={14} />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-md font-semibold text-graycolor py-2">
              Password Reset Options
            </p>
            <p className="text-xs text-gray-500">
              Easily reset your password if forgotten
            </p>
            <p className="text-xs text-gray-500">
              Email:{" "}
              <span className="text-graycolor">
                {encryptEmail(session?.user?.email)}
              </span>{" "}
            </p>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div>
              <p className="text-sm font-medium text-gray-900">
                Two-Factor Authentication (2FA)
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of protection
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onChange={setTwoFactorEnabled}
              className={`${
                twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
            >
              <span
                className={`${
                  twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition-all`}
              />
            </Switch>
          </div>
        </div>
      </div>

      <div className="py-8 hidden">
        <h3 className="text-lg font-semibold text-gray-700">
          Login History/Devices
        </h3>
        <p className="text-sm text-gray-500">Monitor your account activity</p>
      </div>

      {/* Header row (fixed on both desktop & mobile) */}

      {/* Content - scrollable only on mobile */}
      <div className="bg-[#016FDE0D] p-4 rounded-lg hidden">
        <div className="md:overflow-x-visible overflow-x-auto">
          <div className="md:w-auto w-[800px]">
            <div className="grid grid-cols-4 text-sm font-medium  border-b pb-2">
              <span>Device</span>
              <span>Current session</span>
              <span>Location</span>
              <span>Action</span>
            </div>

            {/* Device rows */}
            {devices.map((device, index) => (
              <div
                key={index}
                className="grid grid-cols-4 items-center text-sm text-gray-700 py-2 border-b last:border-0"
              >
                <div className="flex flex-row">
                  <img src={device.image} className="w-8 h-8" />
                  <div className="flex flex-col px-4">
                    <p className="font-medium">{device.name}</p>
                    <p className="text-xs text-gray-500">{device.type}</p>
                  </div>
                </div>
                <div
                  className={
                    device.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {device.time}{" "}
                  <span className="text-xs flex flex-col">{device.status}</span>
                </div>
                <div>{device.location}</div>
                <button className="text-red-500">
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PasswordConfig
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
