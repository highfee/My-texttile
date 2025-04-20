import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const CreateCampaignForm = () => {
  const [formData, setFormData] = useState({
    creator: '',
    title: '',
    audience: 'open to all',
    duration: '',
    community: '',
    platform: '',
    goal: '',
    reward: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white rounded-lg max-w-3xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Create a Campaign</h1>
        <p className="text-sm opacity-[0.66]">
          Optimize your product for visibility, sharing, and sales. Completing them ensures your product is well-presented,
          easy to find, and ready to attract buyers.
        </p>
      </div>

      <div className=" p-6 mb-6">
        <h2 className="text-sm font-semibold text-bluebutton mb-1">Set Up Campaign for a creator</h2>
        <p className="text-sm text-gray-500 mb-4">A subscription plan that caters for every user's category needs</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
          {/* Creator Selection */}
          <div>
            <label className="block mb-1 text-graycolor">Assign to a creator</label>
            <select
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              className="w-1/2 border border-graycolor rounded-md p-2"
            >
              <option value="">email</option>
              {/* Add options if needed */}
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-md mb-1 text-graycolor">Campaign Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter campaign name"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-graycolor text-md mb-1">Incentives</label>
              <input
                type="text"
                name="reward"
                placeholder="Reward"
                value={formData.reward}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-graycolor text-md mb-1">Audience</label>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              >
                <option>open to all</option>
                <option>private</option>
              </select>
            </div>
            <div>
              <label className="block text-graycolor text-md mb-1">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              >
                <option value="">Date</option>
              </select>
            </div>
            <div>
              <label className="block text-graycolor text-md mb-1">Community</label>
              <input
                type="text"
                name="community"
                placeholder="Enter community"
                value={formData.community}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-graycolor text-md mb-1">Platform</label>
              <input
                type="text"
                name="platform"
                placeholder="Enter platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full border border-graycolor rounded-md p-2"
              />
              <p className="text-xs text-bluebutton mt-1">use "," to add more</p>
            </div>
          </div>
          <div>
            <label className="block text-graycolor text-md mb-1">Goal</label>
            <textarea
              name="goal"
              placeholder="Enter campaign goals"
              value={formData.goal}
              onChange={handleChange}
              rows={3}
              className="w-full border border-graycolor rounded-md p-2"
            />
          </div>
          <div className="flex justify-start gap-4 mt-4">
            <button type="button" className="px-4 py-2 border border-graycolor rounded-md  text-graycolor">
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-bluebutton text-white rounded-md">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
