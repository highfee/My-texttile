import { useState } from "react";

const EditProfile = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm relative h-4/5  lg:h-5/6 overflow-y-auto space-y-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <button
          className="absolute top-2 right-2 text-graycolor hover:text-black text-xl"
          onClick={onClose}>
          ✕
        </button>
        <h2 className="text-lg font-semibold">Update Profile</h2>
        <p className="text-xs text-graycolor opacity-[0.44]">
          Set your preferred payout day. Standard payouts process within 7 days,
          while Pro users can enjoy faster options like 24-hour or immediate
          payouts.
        </p>
        <h3 className="text-sm font-semibold">Withdrawal Method</h3>
        <select className="w-full p-2 border rounded">
          <option>Direct Bank Deposit</option>
        </select>
        <h3 className="text-sm font-semibold">Personal Information</h3>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          placeholder="Enter Full Name"
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium">Mobile Number</label>
        <div className="flex space-x-2">
          <select className="p-2 border rounded w-1/4">
            <option>+1</option>
          </select>
          <input
            type="text"
            placeholder="Enter mobile number"
            className="w-3/4 p-2 border rounded"
          />
        </div>
        <h3 className="text-sm font-semibold">Address Details</h3>
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              placeholder="Afghanistan"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              placeholder="Enter postal code"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <label className="block text-sm font-medium">Address</label>
        <input
          type="text"
          placeholder="12 St. Lois, LA"
          className="w-full p-2 border rounded"
        />

        <label className="block text-sm font-medium">Bio</label>
        <textarea
          placeholder="Text here"
          className="w-full p-2 border rounded"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border rounded">Cancel</button>
          <button className="px-4 py-2 bg-bluebutton text-white rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
