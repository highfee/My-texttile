"use client";

import { Button } from "@/components/ui/button";
import { useDeleteDesign } from "@/store/apiCalls/useDesignStore";
import { Loader } from "lucide-react";
import { useState } from "react";

const Tshirt = ({ data }) => {
  const { mutate, isPending } = useDeleteDesign();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.length > 0 &&
        data?.map((shirt, index) => {
          const [selectedSize, setSelectedSize] = useState(shirt.size[0]);
          // const [selectedGender, setSelectedGender] = useState(shirt.genders[0]);
          const [selectedColor, setSelectedColor] = useState(shirt.color[0]);
          const [colorDropdown, setColorDropdown] = useState(false);

          return (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <img
                src={
                  shirt?.design_view_data.front?.imageDataUrl.startsWith(
                    "data:"
                  )
                    ? shirt?.design_view_data.front?.imageDataUrl
                    : process.env.NEXT_PUBLIC_BASE_URL +
                      shirt?.design_view_data.front?.imageDataUrl
                }
                alt={shirt.name}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Name & Sold */}
              <h3 className="font-semibold text-lg mt-2">{shirt.name}</h3>
              <p className="text-sm text-gray-500">Sold {shirt.sold || 30}</p>

              {/* Dropdowns */}
              <div className="grid grid-cols-3 items-center gap-x-4 mt-2">
                {/* Size */}
                <div className="flex flex-col space-y-1 w-full">
                  <label className="text-xs text-gray-500">Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="border  rounded-md px-2 py-1 text-xs md:text-sm bg-white focus:outline-none cursor-pointer"
                  >
                    {shirt.size.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className="flex flex-col space-y-1 w-full">
                  <label className="text-xs text-gray-500">Gen.</label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="border w-20 sm:w-24 md:w-28 lg:w-full rounded-md px-2 py-1 text-xs md:text-sm bg-white focus:outline-none cursor-pointer"
                  >
                    {shirt.genders.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Custom Color Dropdown */}
                <div className="flex flex-col space-y-1 relative w-full">
                  <label className="text-xs text-gray-500">Color</label>
                  <button
                    onClick={() => setColorDropdown(!colorDropdown)}
                    className="border w-20 sm:w-24 md:w-28 lg:w-full rounded-md py-1 flex items-center justify-center bg-white focus:outline-none cursor-pointer"
                  >
                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{ backgroundColor: selectedColor }}
                    ></span>
                  </button>

                  {/* Dropdown Options */}
                  {colorDropdown && (
                    <div className="absolute top-10 left-0 bg-white border rounded-md shadow-md p-2 flex-col flex z-10">
                      {shirt.color.map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            setColorDropdown(false);
                          }}
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: color }}
                        ></button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Availability */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-semibold">{shirt.shop_price}</p>
                {/* <p className="text-sm text-gray-500">
                  Avail. {shirt.available || 20} Pcs
                </p> */}

                <Button
                  variant="destructive"
                  className="h-6"
                  onClick={() => mutate(shirt.id)}
                >
                  {isPending ? <Loader className="animate-spin" /> : "De-list"}
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Tshirt;
