import React, { useState } from "react";
import { CiCalendar, CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { GoArrowDownLeft } from "react-icons/go";
import PurchasesDetail from "@/components/dashboard/sidebarcomponents/Purchasesdetail";
import { productOrders } from "@/data/adminData/userData/purchases";

export default function Purchases() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-[#10B981]"; // Green for Delivered
      case "Pending":
        return "text-[#FF5789]"; // Pink for Pending
      case "Processing":
        return "text-[#FACC15]"; // Yellow for Processing
      default:
        return "text-black"; // Default color
    }
  };
  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };
  if (showDetail) {
    return (
      <PurchasesDetail
        order={selectedOrder}
        onBack={() => setShowDetail(false)}
      />
    );
  }

  return (
    <div className=" lg:px-10 lg:py-6 min-h-screen">
      <div>
        <img
          src="/dashboard/purchases.png"
          alt="Profile"
          className="w-full lg:h-[150px]  object-cover shadow-md rounded-lg"
        />
      </div>
      <div className="flex lg:py-6 justify-between">
        <div className="hidden md:flex flex-row items-center space-x-2 border border-black rounded-lg p-2">
          <CiCalendar className="" />
          <p className="text-sm ">Date Modified</p>
          <IoIosArrowDown className="" />
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="hidden md:flex  flex-row items-center space-x-2 border border-black rounded-lg p-2">
            <CiFilter className="" />
            <p className="text-sm ">Most Relevant</p>
            <IoIosArrowDown className="" />
          </div>
          <div className="hidden md:flex border border-black rounded-md p-2">
            <IoGridOutline className="text-[20px]" />
          </div>
        </div>
      </div>
      <div className="flex flex-row py-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Orders</h1>
        <div className="md:hidden flex flex-row items-center space-x-2 border border-black rounded-lg p-2 ml-auto">
          <CiFilter className="" />
          <IoIosArrowDown className="" />
        </div>
      </div>
      <div
        className="relative rounded-lg p-2"
        style={{ border: "1px solid var(--FadeColor, #12121270)" }}
      >
        <div className="p-2 whitespace-nowrap overflow-x-auto md:overflow-x-visible">
          <div className="grid grid-cols-5 gap-2 font-medium text-graycolor opacity-[0.44] pb-4 px-4 min-w-[600px]">
            <div className="col-span-1">Customer</div>
            <div className="col-span-1">Product</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-1">Qty</div>
            <div className="col-span-1">Status</div>
          </div>
          <div className="space-y-4 px-2 min-w-[600px]">
            {productOrders.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 items-center text-black border-b border-[#DCE7F2] py-1 cursor-pointer"
                onClick={() => handleRowClick(order)} // Add click handler
              >
                <div className="col-span-1 flex flex-row items-center space-x-2">
                  <img src="/dashboard/purchaseicon.png" alt="Customer Icon" />
                  <p className="text-sm ">{order.customer}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm ">{order.product}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm ">{order.amount}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm ">{order.qty}</p>
                </div>
                <div className="col-span-1">
                  <p className={`text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-graycolor opacity-[0.44] text-[14px] mb-2">
          Transaction History
        </p>
        <div
          className="relative flex flex-row justify-between items-center rounded-lg p-4"
          style={{ border: "1px solid var(--FadeColor, #12121270)" }}
        >
          <div className="flex flex-row items-center space-x-3">
            <div className="bg-[#F0F3F4] rounded-full p-1">
              <GoArrowDownLeft className="text-[#10B981] text-[20px] font-bold  " />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-800">
                Tier 3 creator plan
              </p>
              <p className="text-xs text-gray-500">
                Today, Jan 18, 2025 (02:23 AM)
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">$65.76</p>
          </div>
        </div>
      </div>
    </div>
  );
}
