import React from "react";
import { IoImageOutline } from "react-icons/io5";
const General = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:px-8 gap-y-8 text-sm text-gray-800">
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Platform Branding</h2>
          <p className="text-xs text-gray-500">Help us know you better.</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-row justify-between items-end gap-4">
            <div className="flex flex-col w-full">
              <label className="block mb-1">Platform Name</label>
              <input
                type="text"
                placeholder="Name here"
                className="w-1/2 border px-3 py-1 rounded focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="block mb-1 whitespace-nowrap">Branding color</label>
              <div className="w-6 h-6 bg-blue-600 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-1">Logo (Large)</label>
              <button className="w-1/2 border px-6 py-1 rounded text-center text-lg">
              <IoImageOutline />
              </button>
            </div>
            <div>
              <label className="block mb-1">favicon</label>
              <button className="w-fit border px-6 py-1 rounded text-center text-lg">
              <IoImageOutline />
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1">Logo (Small)</label>
            <button className="w-fit border py-1 px-6 rounded text-center text-lg">
            <IoImageOutline />
            </button>
          </div>
        </div>
      </div>

      {/* Payment & Currency */}
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Payment & Currency</h2>
          <p className="text-xs text-gray-500">Help us know you better.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Default Currency</label>
            <select className="w-full border px-2 py-1 rounded focus:outline-none">
              <option>USD, EUR, NGN, USDC, BTC</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Multi-currency support</span>
            <Toggle defaultChecked={false} />
          </div>

          <div className="flex items-center justify-between">
            <span>Auto-update exchange rates</span>
            <Toggle defaultChecked={true} />
          </div>
        </div>
      </div>

      {/* Notification & Security - Left */}
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Notification & Security</h2>
          <p className="text-xs text-gray-500">Help us know you better.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notification</span>
            <Toggle />
          </div>
          <div className="flex items-center justify-between">
            <span>In-app Notifications</span>
            <Toggle defaultChecked={true} />
          </div>
          <div className="flex items-center justify-between">
            <span>System Alerts</span>
            <Toggle />
          </div>
          <div className="flex items-center justify-between">
            <span>Admin Reports</span>
            <select className="border px-2 py-1 rounded">
              <option>Weekly</option>
              <option>Daily</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification & Security - Right */}
      <div className="pt-[33px] space-y-4">
        <div className="flex items-center justify-between">
          <span>Two-Factor Authentication</span>
          <Toggle />
        </div>
        <div className="flex items-center justify-between">
          <span>Session Timeout Duration</span>
          <select className="border px-2 py-1 rounded">
            <option>10 mins.</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span>Set password rules</span>
          <select className="border px-2 py-1 rounded">
            <option>At least 8 chars</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <span>Admin Reports</span>
          <select className="border px-2 py-1 rounded">
            <option>Weekly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default General;

// Toggle switch component styled like in the image
const Toggle = ({ defaultChecked = false }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
    </label>
  );
};