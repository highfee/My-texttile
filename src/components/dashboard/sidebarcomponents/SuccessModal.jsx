import React, { useEffect } from "react";

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const handleBackgroundClick = (e) => {
    if (e.target.id === "success-modal-bg") {
      onClose();
    }
  };
  return (
    <div
      id="success-modal-bg"
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
        <h2 className="text-blue-600 text-lg font-semibold mb-4">
          You’ve Successfully Initialise Withdrawal
        </h2>
        <div className="flex justify-center mb-4">
          <img src="/successmodal.png" alt="Success" className="h-40 w-40 object-contain" />
        </div>
        <p className="text-sm text-gray-500">
          All Withdrawal are processed with your preferred period <br />
          and priority is given to Premium creators.
        </p>
      </div>
    </div>
  );
}
