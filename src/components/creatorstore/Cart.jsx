"use client";

import { useState } from "react";
import Checkout from "./Checkout";
import { MdDelete } from "react-icons/md";
import useCartStore from "@/store/cart_store";

export default function Cart() {
  const {
    items,
    decrementQuantity,
    incrementQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore();

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
          {items.length} Item In Cart
        </h2>

        <section className=" border rounded-xl p-4 flex flex-col gap-5">
          {items.length > 0
            ? items.map((cartItem) => (
                <div className="flex items-center justify-between">
                  {/* Product Image */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        cartItem?.design_view_data.front?.imageDataUrl.startsWith(
                          "data:"
                        )
                          ? cartItem?.design_view_data.front?.imageDataUrl
                          : process.env.NEXT_PUBLIC_BASE_URL +
                            cartItem?.design_view_data.front?.imageDataUrl
                      }
                      alt={cartItem.name}
                      className="w-20 h-20 object-contain"
                    />
                    {/* Product Details */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold">
                        {cartItem.design_description}
                      </h3>
                      <div className="text-xs text-gray-500">
                        Size:{" "}
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">Size:</span>
                          <div className="flex gap-2">
                            {cartItem.size.map((size) => (
                              <p
                                key={size}
                                className="px-2 py-0.5 border rounded-md hover:bg-gray-100 text-xs"
                              >
                                {size}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Colour:</span>
                        <div className="flex gap-2">
                          {cartItem.color.map((color) => (
                            <button
                              key={color}
                              className="size-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center overflow-hidden mt-3">
                        <button
                          className="px-2  border rounded-md  text-lg"
                          onClick={() => decrementQuantity(cartItem.id)}
                        >
                          -
                        </button>
                        <span className="px-3">{cartItem.quantity}</span>
                        <button
                          className="px-2  border rounded-md  text-lg"
                          onClick={() => incrementQuantity(cartItem.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Remove */}

                  {/* Price */}

                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm font-semibold">
                      ${parseFloat(cartItem.shop_price).toFixed(2)}
                    </div>
                    <button
                      className="border px-3 py-1 text-sm rounded-md hover:bg-gray-100 flex flex-row justify-center"
                      onClick={() => removeItem(cartItem.id)}
                    >
                      <MdDelete className="text-xl" /> Remove
                    </button>
                  </div>
                </div>
              ))
            : "Your cart is empty."}
        </section>
      </div>

      {/* Right Side (Summary) */}
      <div className="w-full md:w-[300px] bg-white rounded-xl p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-lg font-semibold">Sub Total</h3>
        <div className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</div>
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
