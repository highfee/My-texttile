import React, { useState } from "react";
import { LiveCampaign } from "./LiveCampaign";

export function CreateCampaign({ onClose }) {
  const [showLiveCampaign, setShowLiveCampaign] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePublish = () => {
    setShowLiveCampaign(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div 
          className="flex flex-col bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] p-2 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:flex-row overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Left Column - Form Fields */}
            <div className="lg:w-2/3 p-4">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold">Create a Campaign</h2>
              </div>

              <p className="mb-6">
                Optimize your product for visibility, charting, and sales.
                Completing them ensures your product is well-presented, easy to
                find, and ready to attract buyers.
              </p>

              <h3 className="text-lg font-semibold mb-4">Set Up Campaign Details:</h3>
              <p className="text-sm text-gray-600 mb-6">
                A subscription plan that collects for every user's category needs:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter campaign name"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Revised"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Audience
                  </label>
                  <input
                    type="text"
                    placeholder="Open to all"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dashboard Date
                  </label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Community
                  </label>
                  <input
                    type="text"
                    placeholder="Enter community"
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Platform
                  </label>
                  <input
                    type="text"
                    placeholder="Enter platform"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Goal
                </label>
                <textarea 
                  placeholder="Describe your campaign goals"
                  className="w-full p-2 h-16 rounded-md border"
                />
              </div>
            </div>
            <div className=" lg:w-1/3 p-4 lg:rounded-r-lg ">
              <h4 className="font-semibold mb-2">How to use a Campaign Tool!</h4>
              <p className="text-sm text-gray-600 mb-4">
                Need Help Getting Started?
              </p>
              <p className="text-sm text-gray-600">
                Written on YouTube tutorial, "How to Use the Campaign Tool" is a
                step-by-step guide. Learn how to create campaigns, engage your
                community, and measure your results. Click now to master the tool
                and grow your brand effortlessly!
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-x-4 ">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-graycolor hover:bg-gray-100"
              type="button"
            >
              Back
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-bluebutton text-white rounded-md hover:bg-blue-700"
              type="button"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {showLiveCampaign && (
        <LiveCampaign onClose={() => {
          setShowLiveCampaign(false);
          onClose();
        }} />
      )}
    </>
  );
}