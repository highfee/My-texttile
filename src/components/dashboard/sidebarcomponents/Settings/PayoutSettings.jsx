import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FiEdit2 } from "react-icons/fi";
import { CiSquareInfo } from "react-icons/ci";
import { FiX } from "react-icons/fi";
const PayoutSettings = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="w-full  space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between bg-white shadow-md p-2 lg:p-4 rounded-lg">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Circular Progress Indicator */}
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
              {/* Background Circle */}
              <circle
                className="text-gray-300 stroke-current"
                strokeWidth="3"
                cx="18"
                cy="18"
                r="16"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                className="text-blue-500 stroke-current"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset="50"
                cx="18"
                cy="18"
                r="16"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {/* Progress Text in Center */}
            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-blue-500">
              2/4
            </div>
          </div>

          {/* Text Information */}
          <div>
            <p className="font-medium">You're halfway there!</p>
            <p className="text-sm text-gray-500">
              Please complete your payout settings to ensure timely and accurate
              payments.
            </p>
          </div>
        </div>

        {/* Dismiss Button (Only on Desktop, aligned to the right) */}
        <div className="lg:flex justify-end ">
          <button className="text-bluebutton text-sm font-semibold flex items-center bg-[#016FDE1A] p-1 px-4">
            Dismiss
          </button>
        </div>
      </div>
        <div className="bg-white shadow-md rounded-lg p-2 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Payout</h2>
          <p className="text-sm text-gray-500">
            Manage your earnings efficiently
          </p>

          <h3 className="text-sm font-semibold">Payment Methods</h3>
          <p className="text-sm text-gray-500">
            Add and manage your preferred payment methods (e.g., PayPal, bank
            transfer)
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-sm font-semibold text-red-500">
              * Select Payment Method
            </label>
            <select className="w-full p-2 border rounded bg-white">
              <option>Select Method</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-row gap-x-2">
                <h3 className="text-sm font-semibold">Payout Schedule</h3>
                <p className="text-xs text-gray-500">7 days period (Default)</p>
                <CiSquareInfo className="text-gray-500" />
              </div>

              <p className="text-xs text-gray-500">
                Set your desired payout frequency and schedule.
              </p>
            </div>
            <button className="p-2 bg-gray-200 rounded-lg flex items-center">
              <FiEdit2 className="text-gray-600" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold">
                * Two-Factor Authentication (2FA)
              </h3>
              <p className="text-xs text-gray-500">
                Add an extra layer of protection
              </p>
            </div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable 2FA</span>
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
          <div className="flex flex-row gap-x-2">
            <label className="text-sm font-semibold text-red-500">
              * Tax Identification Number (TIN)
            </label>
            <CiSquareInfo className="text-gray-500" />
          </div>

          <input
            type="text"
            placeholder="9XX-8X-XXXX-XXXX-XX"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div>
          <h3 className="text-sm font-semibold">Verification</h3>
          <p className="text-sm text-gray-500">
            Ensure secure and reliable payouts
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-row gap-x-2">
                <h3 className="text-sm font-semibold">Identity Verification</h3>

                <CiSquareInfo className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                Set your desired payout frequency and schedule.
              </p>
            </div>
            <button className="p-2 bg-gray-200 rounded-lg flex items-center">
              <FiEdit2 className="text-gray-600" />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex flex-row gap-x-2">
                <h3 className="text-sm font-semibold">Address Verification</h3>

                <CiSquareInfo className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">
                Set your desired payout frequency and schedule.
              </p>
            </div>
            <button className="p-2 bg-gray-200 rounded-lg flex items-center">
              <FiEdit2 className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

        </div>
      
    </div>
  );
};

export default PayoutSettings;
