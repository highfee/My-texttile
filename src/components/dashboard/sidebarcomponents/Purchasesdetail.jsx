import React from "react";

export default function PurchasesDetail({ order, onBack }) {
  // Order History Data
  const orderHistory = [
    {
      title: "Product Shipped",
      description: "13/01/2025 3:23 pm",
    },
    {
      title: "Carrier Services MyTeedi Express Delivery",
      description: "Estimated Delivery Date: 23rd February 2025",
    },
    {
      title: "Product Packaging",
      description: "13/01/2025 3:23 pm",
    },
    {
      title: "Order Confirmation",
      description: "13/01/2025 3:23 pm",
    },
    {
      title: "Order Placed",
      description: "13/01/2025 3:23 pm",
    },
  ];

  return (
    <div className="lg:px-10 px-2 py-6 min-h-screen leading-[19.6px] tracking-[-0.5px]">
      {/* Back Button */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <span className="text-graycolor text-lg font-medium">{`<`}</span>
        <p className="text-graycolor text-lg">Back</p>
      </div>

      {/* Main Content */}
      <div className="mt-6 bg-white rounded-lg shadow-sm lg:p-6 p-2">
        {/* Top Section: Design, Product, Orders, Price, Payment, Delivery Status */}
        <div className="border border-gray-200 rounded-lg p-4 overflow-x-auto">
          <div className="flex flex-row justify-between items-start whitespace-nowrap ">
            {/* Design and Image */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-base font-semibold text-graycolor">
                Design (4 Types)
              </h1>
              <img
                src="/dashboard/img2.png"
                alt="Design"
                className="w-[184px] h-[121px] rounded-lg"
              />
            </div>

            {/* Name/Category */}
            <div className="flex flex-col ml-6">
              <p className="text-base font-semibold text-graycolor pb-1">Name/Category</p>
              <p className="text-sm text-graycolor">Unisex Classic T-shirt</p>
              <p className="text-sm text-graycolor opacity-[0.44]">T-shirt</p>
              <div className="flex flex-row">
                <p className="text-sm text-graycolor opacity-[0.44]">Order No: </p>
                <span className="text-graycolor">#MyT-45679yu</span>
              </div>
            </div>

            {/* Orders */}
            <div className="flex flex-col ml-6">
              <p className="text-base font-semibold text-graycolor pb-4">Orders</p>
              <p className="text-sm text-graycolor opacity-[0.44] pb-4">6Pcs</p>
              <p className="text-sm text-graycolor opacity-[0.44]">Delivery Method:</p>
              <p className="text-sm text-graycolor">My Textil Express</p>
            </div>

            {/* Price */}
            <div className="flex flex-col ml-6">
              <p className="text-base font-semibold text-graycolor pb-4">Price</p>
              <p className="text-sm text-graycolor font-bold">$250.99</p>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col ml-6">
              <p className="text-base font-semibold text-graycolor pb-4">Payment Status</p>
              <p className="text-sm text-[#10B981] pb-10">Payed</p>
              <p className="text-sm text-graycolor">Card Payment</p>
            </div>

            {/* Delivery Status */}
            <div className="flex flex-col ml-6">
              <p className="text-base font-semibold text-graycolor pb-4">Dell. Status</p>
              <p className="text-sm text-[#FACC15]">Processing</p>
            </div>
          </div>

          {/* Middle Section: Name, Delivery Address, Customer Contact, Delivery Date, Discount */}
          <div className="flex flex-row  items-start whitespace-nowrap gap-x-8 lg:gap-x-12 mt-6">
            {/* Name */}
            <div className="flex flex-col">
              <p className="text-base font-semibold text-graycolor">Jame Hunt</p>
              <p className="text-base font-semibold text-graycolor pb-1">Delivery Address</p>
              <p className="text-sm text-graycolor opacity-[0.44]">
                123 Fashion Ave, Style City,<br className="lg:hidden"/> CA 90210
              </p>
              <p className="text-sm font-semibold text-graycolor">Peru</p>
              <p className="text-sm text-graycolor opacity-[0.44]">997542</p>
            </div>

            {/* Customer Contact */}
            <div className="flex flex-col">
              <p className="text-base font-semibold text-graycolor pb-1">Customers Contact</p>
              <p className="text-sm text-graycolor opacity-[0.44]">
                contact@myjeail.com
              </p>
              <p className="text-sm text-graycolor opacity-[0.44]">
                +51 912 345 678
              </p>
            </div>

            {/* Delivery Date */}
            <div className="flex flex-col">
              <p className="text-base font-semibold text-graycolor pb-1">Delivery Date</p>
              <p className="text-sm text-graycolor opacity-[0.44]">
                Mar. 12 - Mar. 18 2025
              </p>
            </div>

            {/* Discount */}
            <div className="flex flex-col">
              <p className="text-base font-semibold text-graycolor pb-1">Discount</p>
              <p className="text-sm text-graycolor opacity-[0.44]">$0.00</p>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="mt-8">
          <p className="text-base font-semibold text-graycolor pb-2">Order History</p>
          <div className="relative">
            {/* Vertical Dashed Line */}
            <div className="absolute left-4 top-0 h-full border-l border-dashed border-bluebutton"></div>

            {/* Timeline Items */}
            <div className="space-y-4 px-8">
              {orderHistory.map((item, index) => (
                <div key={index} className="flex items-start relative px-3">
                  {/* Dot Indicator */}
                  <div className="absolute -left-5 top-2 w-2 h-2 bg-bluebutton rounded-full"></div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-graycolor">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}