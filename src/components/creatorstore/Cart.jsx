"use client";

import { useState } from "react";
import Checkout from "./Checkout";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const [checkout, setCheckout] = useState(false);

  // Dummy cart item
  const cartItem = {
    name: "Stylish Maxi Dress",
    price: 32.5,
    size: "L",
    color: "black",
    quantity: 1,
    image: "/creatorstore/shirt2.png", // Update with your correct image path
  };

  if (checkout) return <Checkout />;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-8 min-h-screen bg-gray-50">
      {/* Left Side (Cart Items) */}
      <div className="flex-1 bg-white rounded-xl p-6">
        <h2 className="text-sm text-gray-500 mb-4">
          {cartItem.quantity} Item In Cart
        </h2>

        <div className="flex items-center justify-between border rounded-xl p-4">
          {/* Product Image */}
          <div className="flex items-center gap-4">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="w-20 h-20 object-contain"
            />
            {/* Product Details */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold">{cartItem.name}</h3>
              <p className="text-xs text-gray-500">Size: {cartItem.size}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Colour:</span>
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: cartItem.color }}
                ></div>
              </div>
              <div className="flex items-center overflow-hidden">
                <button className="px-2  border rounded-md  text-lg">-</button>
                <span className="px-3">{cartItem.quantity}</span>
                <button className="px-2  border rounded-md  text-lg">+</button>
              </div>
            </div>
          </div>

          {/* Quantity and Remove */}

          {/* Price */}

          <div className="flex flex-col items-center gap-4">
            <div className="text-sm font-semibold">
              ${cartItem.price.toFixed(2)}
            </div>
            <button className="border px-3 py-1 text-sm rounded-md hover:bg-gray-100 flex flex-row justify-center">
              <MdDelete className="text-xl" /> Remove
            </button>
          </div>
        </div>
      </div>

      {/* Right Side (Summary) */}
      <div className="w-full md:w-[300px] bg-white rounded-xl p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-lg font-semibold">Sub Total</h3>
        <div className="text-2xl font-bold">${cartItem.price.toFixed(2)}</div>
        <p className="text-xs text-gray-400">Delivery fees not included yet.</p>
        <button
          onClick={() => setCheckout(true)}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 text-sm"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
}

// Checkout Component (Simple Dummy)
