"use client";

import { useState } from "react";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    subject: "",
    message: "",
    orderNumber: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send formData to your API or server here
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Request Support</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Example@domain.com"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subject</label>
          <select
            name="subject"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Concern</option>
            <option value="Order">Order</option>
            <option value="Refund">Refund</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            name="message"
            placeholder="Please Enter The Details Of Your Request."
            className="w-full border border-gray-300 rounded-md p-3 h-28 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Order Number</label>
          <input
            type="text"
            name="orderNumber"
            placeholder="You Can Find Your Order Number In Your Confirmation Email."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={formData.orderNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2 py-2 space-x-2">
          <label className="text-sm font-medium">Attachment</label>
          <label className="w-full border-2 border-dashed border-gray-300 rounded-md p-2  text-center text-gray-500 cursor-pointer hover:bg-gray-50">
            {formData.attachment
              ? formData.attachment.name
              : "Add File Or Drag & Drop A File Here"}
            <input
              type="file"
              name="attachment"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
