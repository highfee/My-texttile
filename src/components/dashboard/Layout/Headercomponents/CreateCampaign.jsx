import React, { useState } from "react";
import { X } from "lucide-react";
import { LiveCampaign } from "./LiveCampaign";

export function CreateCampaign({ onClose }) {
  const [showLiveCampaign, setShowLiveCampaign] = useState(false);
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    location: "",
    audience: "Open to all",
    date: "",
    community: "",
    platform: "",
    goal: "",
    duration: 14,
    reward: ""
  });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    console.log("Publishing campaign:", campaignData);
    setShowLiveCampaign(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div 
          className="flex flex-col bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-semibold">Create a Campaign</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {/* Left Column - Form Fields */}
            <div className="lg:w-2/3 p-6">
              <p className="mb-6 text-gray-600">
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
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={campaignData.name}
                    onChange={handleChange}
                    placeholder="Enter campaign name"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={campaignData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Audience
                  </label>
                  <input
                    type="text"
                    name="audience"
                    value={campaignData.audience}
                    onChange={handleChange}
                    placeholder="Open to all"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dashboard Date
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    value={campaignData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Community
                  </label>
                  <input
                    type="text"
                    name="community"
                    value={campaignData.community}
                    onChange={handleChange}
                    placeholder="Enter community"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Platform
                  </label>
                  <input
                    type="text"
                    name="platform"
                    value={campaignData.platform}
                    onChange={handleChange}
                    placeholder="Enter platform"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={campaignData.duration}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Reward
                  </label>
                  <input
                    type="text"
                    name="reward"
                    value={campaignData.reward}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., $50 Gift Card"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea 
                  name="description"
                  value={campaignData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your campaign"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Goal
                </label>
                <textarea 
                  name="goal"
                  value={campaignData.goal}
                  onChange={handleChange}
                  placeholder="Describe your campaign goals"
                  className="w-full p-2 h-16 rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Column - Help Section */}
            <div className="lg:w-1/3 p-6 bg-gray-50">
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
          <div className="flex justify-end gap-4 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              type="submit"
            >
              Publish Campaign
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