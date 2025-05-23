"use client";

import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CreatorHeader({ toggleCart, onHomeClick, data }) {
  console.log(data);
  return (
    <div
      style={{
        backgroundColor: data.background_colour,
        color: data.text_colour,
      }}
    >
      <header className="w-full flex items-center justify-between px-6 py-3">
        {/* Left: Logo - now clickable */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <span className="text-black font-bold text-lg">
            {data?.shop_name}
          </span>
          {/* <span className="text-sm text-gray-700">My-Store</span> */}
          <Image
            src={data?.shop_logo}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        {/* Center: Navigation */}
        <nav className="flex space-x-4">
          <span
            className="text-black text-sm font-semibold cursor-pointer"
            onClick={onHomeClick}
          >
            Home
          </span>
          <span className="text-gray-500 text-sm">Apparel</span>
        </nav>

        {/* Right: Search & Cart */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 bg-white">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 outline-none text-sm bg-transparent placeholder-gray-400"
            />
          </div>

          {/* Cart */}
          <div
            onClick={toggleCart}
            className="flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5 text-black" />
            <span className="text-sm text-gray-700">0</span>
          </div>
        </div>
      </header>
    </div>
  );
}
