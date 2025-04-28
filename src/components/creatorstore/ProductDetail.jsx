"use client";

import { useState } from "react";

const colors = ["black", "white", "red", "brown", "blue", "green", "lime"];

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // NEW: managing which tab is active

  if (!product) return null;

  return (
    <div className="flex flex-col gap-10 p-8 px-16 ">
      {/* Left Side (Image) */}
      <div className="flex flex-row gap-10 justify-center ">
        <div className="bg-white rounded-md py-10 flex flex-col lg:flex-row px-16 gap-10">
          <div className="flex flex-col items-center gap-4 ">
            <div className="bg-gray-100 rounded-xl ">
              <img
                src={product.image}
                alt={product.name}
                className=" w-[300px]  h-[300px] "
              />
            </div>
          </div>

          {/* Right Side (Details) */}
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-xl font-bold">{product.price}</p>
              <p className="text-gray-600 text-sm">
              The Vintage Vibes T-Shirt is a must-have for anyone who loves a classic look with a modern twist. Made from soft, breathable cotton. it pairs effortlessly with jeans or shorts, making it a versatile addition to your wardrobe. Embrace nostalgia and express your unique personality with this stylish t-shirt!
              </p>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Colour:</span>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Size:</span>
                <div className="flex gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Category:</span>
                <span className="text-sm text-gray-700">Apparel</span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 bg-gray-100 text-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
                <button className="px-6 py-3 bg-black text-white rounded-xl text-sm hover:bg-gray-800">
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Tabs */}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-6 border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-2 font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`py-2 font-semibold ${
              activeTab === "refund"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Return Policy
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6 text-sm text-gray-700 flex flex-col gap-3">
          {activeTab === "description" && (
            <>
              <p>
                {product.name}
                <br />
                <br />
                Perfect blend of retro and modern. Soft, breathable and ready
                for any occasion.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Soft breathable fabric</li>
                <li>Relaxed fit</li>
                <li>Perfect for layering</li>
                <li>Stylish colors</li>
              </ul>
            </>
          )}
          {activeTab === "refund" && (
            <>
              <p>We offer a 30-day return policy from the date of purchase.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Items must be unused and in original condition</li>
                <li>Receipt or proof of purchase required</li>
                <li>Refunds processed within 5-7 business days</li>
                <li>Customer is responsible for return shipping costs</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
