'use client';

import { useState } from 'react';

export default function Checkout() {
  const [coupon, setCoupon] = useState('');

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 min-h-screen bg-gray-50">

      {/* Left Side (Customer Details) */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Customer's Details</h2>

        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              className="border rounded-md p-3 text-sm"
            />
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md p-3 text-sm"
            />
          </div>

          {/* Country or Region */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Country Or Region</label>
            <select className="border rounded-md p-3 text-sm">
              <option>Peru</option>
              <option>United States</option>
              <option>India</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Address</label>
            <input
              type="text"
              placeholder="Add Address"
              className="border rounded-md p-3 text-sm"
            />
          </div>

          {/* Address Line 2 */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Address Line 2</label>
            <input
              type="text"
              placeholder="Optional"
              className="border rounded-md p-3 text-sm"
            />
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              placeholder="City"
              className="border rounded-md p-3 text-sm"
            />
          </div>

          {/* Postal Code + State */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium">Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                className="border rounded-md p-3 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-sm font-medium">State</label>
              <select className="border rounded-md p-3 text-sm">
                <option>Peru</option>
                <option>California</option>
                <option>Texas</option>
              </select>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm">
                🇵🇪 <span>+51</span>
              </div>
              <input
                type="text"
                placeholder="1234567"
                className="flex-1 border rounded-md p-3 text-sm"
              />
            </div>
          </div>

        </form>
      </div>

      {/* Right Side (Order Summary) */}
      <div className="w-full md:w-[300px] bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4 h-fit">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span>1x T-shirt</span>
            <span>$ 60.87</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery Fee</span>
            <span>$ 14.99</span>
          </div>
        </div>

        {/* Promotions */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Promotions</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border rounded-md p-2 flex-1 text-sm"
            />
            <button className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300">
              Apply
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="text-2xl font-bold">$32.50</div>
        <p className="text-xs text-gray-400">Delivery fees not included yet.</p>

        {/* Place Order Button */}
        <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 text-sm">
          Place Your Order
        </button>

        {/* PayPal Button */}
        <button className="w-full border py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-100">
          <img src="/creatorstore/paypalicon.svg" alt="Paypal" className="h-5" />
          
        </button>
      </div>
    </div>
  );
}
