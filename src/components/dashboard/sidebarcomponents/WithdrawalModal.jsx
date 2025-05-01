// components/WithdrawalModal.jsx
import React from "react";

export default function WithdrawalModal({ onClose, onWithdraw }) {
  const handleBackgroundClick = (e) => {
    if (e.target.id === "withdrawal-modal-bg") {
      onClose();
    }
  };

  return (
    <div
      id="withdrawal-modal-bg"
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-blue-600 text-lg font-semibold mb-4">Initialise Withdrawal</h2>

        <p className="font-semibold text-center">
          Withdrawal Amount <span className="text-sm text-gray-500 font-normal ml-2">Current Balance: $2,200</span>
        </p>

        <input
          type="text"
          placeholder="Enter amount"
          className="w-full border border-gray-200 mt-4 mb-6 p-2 rounded-lg text-center focus:outline-none"
        />

        <p className="text-center text-xs text-gray-500">
          All Withdrawal are processed with your preferred period <br />
          and priority is given to Premium creators.
        </p>

        <p className="text-center text-xs text-gray-500 mt-1">
          Check <a href="#" className="text-blue-600 underline">settings</a> to make adjustment.
        </p>

        <div className="flex justify-center mt-6">
          <button
            className="bg-bluebutton text-white px-6 py-2 rounded-lg hover:opacity-90"
            onClick={onWithdraw}
          >
            Make Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
}
