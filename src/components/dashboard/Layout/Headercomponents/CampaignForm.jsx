import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export function CampaignForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    duration: 14,
    goal: "",
    location: "",
    audience: "Open to all",
    community: "",
    platform: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Campaign form submitted:", formData);
    onClose();
  };

  return (
    <div className="px-2 lg:px-8 ">
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full">
          <p className="text-lg lg:text-2xl font-bold">
            WRITER EDITION COLLECTION
          </p>
          <p className="font-semibold text-xl px-3 py-1">
            Financial $50 Gift card
          </p>
        </div>
        <div className="py-2">
          <img
            src="/dashboard/campaign/approval.jpg"
            className="w-full object-cover h-[215px]"
          />
        </div>
        <p className="text-[#121212CC] text-sm lg:text-lg font-semibold mb-6">
          Join our exciting Print on Demand design campaign! We invite our
          creative community to contribute their unique designs for our upcoming
          print collection. This is your chance to showcase your talent and have
          your artwork featured on our products. Share your designs with us and
          be part of a collaborative effort to create something special
          together. Let's make this collection a true reflection of our
          community's creativity!
        </p>
        <div className="border-t border-gray-200 my-6"></div>
      </div>
      <p className="text-md mb-6 text-[#FF5789] bg-[#FF578914]">
        * Fill out our form to join our campaign! Share your unique designs for
        a chance to feature your artwork in our collection.
      </p>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl ">
          <div>
            <label className="text-sm font-semibold text-[#FF5789]">
              * <span className="text-graycolor"> Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name here"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-400 px-3 py-2 rounded-md"
            />
          </div>

          {/* Telegram/Discord Username */}
          <div>
            <label className="text-sm font-semibold text-[#FF5789]">
              *{" "}
              <span className="text-graycolor"> Telegram/Discord Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="@ username"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-400 px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#FF5789]">
              * <span className="text-graycolor">Upload Your Design</span>
            </label>
            <div className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <img
                  src="/icons/image-upload-icon.svg"
                  alt="Upload"
                  className="w-6 h-6"
                />
                <p>Drag image here to upload or click to select destination</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#D7E9FF] text-[#016FDE] px-4 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            Download original design
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
              />
            </svg>
          </button>
          <div>
            <label className="text-sm font-semibold text-black">Message</label>
            <select
              name="message"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-400 px-3 py-2 rounded-md"
            >
              <option>Select Listings</option>
              <option>Listing A</option>
              <option>Listing B</option>
            </select>
          </div>
          <div className="flex gap-6">
            <button
              type="submit"
              className="bg-[#016FDE] text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setFormData({})}
              className="text-[#FF5789] px-6 py-2 font-semibold"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
