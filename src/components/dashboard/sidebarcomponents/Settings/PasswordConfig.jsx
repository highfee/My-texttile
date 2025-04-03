import { useState } from "react";
import { FiUsers } from "react-icons/fi";

const PasswordConfig = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative h-4/5 lg:h-5/6 overflow-y-auto space-y-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <button
          className="absolute top-2 right-2 text-graycolor hover:text-black text-xl"
          onClick={onClose}>
          ✕
        </button>
        <h3 className="text-lg font-semibold text-graycolor flex items-center gap-x-2">
          <FiUsers className="text-bluebutton " /> Password Config
        </h3>
        <p className="text-sm text-gray-500">
          Set your preferred payout day. Standard payouts process within 7 days,
          while Pro users can enjoy faster options like 24-hour or immediate
          payouts.{" "}
        </p>

        <div className="mt-4">
          <label className="text-sm font-medium text-graycolor">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password here"
            className="w-full border p-2 rounded-lg mt-1 text-sm "/>

          <label className="text-sm font-medium text-graycolor mt-3 block">
            New Password
          </label>
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded-lg mt-1 text-sm"/>
            <p className="py-4 text-sm opacity-[0.44]">Choose your password reset option</p>
          <label className="text-sm font-medium text-graycolor mt-3 block">
            Password reset channel
          </label>
          <select className="w-full border p-2 rounded-lg text-sm mt-1">
            <option>Email</option>
            <option>Phone</option>
          </select>
          <label className="text-sm font-medium text-graycolor mt-3 block">
            Verify Mobile Number
          </label>
          <div className="flex items-center space-x-2">
            <select className="border p-2 rounded-lg text-sm">
              <option>+1</option>
              <option>+92</option>
            </select>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="border p-2 rounded-lg text-sm w-full"
            />
          </div>
          <p className="text-xs text-red-500 mt-1">
            0 : 00 Didn't get the code?{" "}
            <span className="text-blue-500">Resend</span>
          </p>
          <label className="text-sm font-medium text-graycolor mt-3 block">
            Enter Verification Code
          </label>
          <input
            type="text"
            placeholder="********"
            className="w-full text-center border p-2 rounded-lg text-sm mt-1"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button className="bg-bluebutton text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfig;
