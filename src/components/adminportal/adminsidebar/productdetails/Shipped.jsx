import React, { useState } from 'react';
import Search from '../Search';
import Pagination from '../Pagination';

const productOrders = [
  {
    customer: "NonLee",
    product: "Classic Tee",
    amount: "$150",
    qty: 2,
    status: "Shipped",
  },
  {
    customer: "NonLee",
    product: "Classic Tee",
    amount: "$150",
    qty: 2,
    status: "Shipped",
  },
  {
    customer: "NonLee",
    product: "Graphic Tee",
    amount: "$400",
    qty: 5,
    status: "Shipped",
  },
  {
    customer: "NonLee",
    product: "Vintage Tee",
    amount: "$2,500",
    qty: 2,
    status: "Shipped",
  },
  {
    customer: "NonLee",
    product: "Basic Tee",
    amount: "$250",
    qty: 1,
    status: "Shipped",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "text-[#10B981]";
    case "Pending":
      return "text-[#FF5789]";
    case "Shipped":
      return "text-[#FACC15]";
    default:
      return "text-black";
  }
};

export default function Shipped({ onRowClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productOrders.length / 5);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Search />
      <div
        className="relative rounded-lg p-4"
        style={{ border: "1px solid var(--FadeColor, #12121270)" }}
      >
        {/* Inner Content */}
        <div className="p-2 whitespace-nowrap overflow-x-auto md:overflow-x-visible">
          <div className="grid grid-cols-5 gap-2 font-medium text-graycolor opacity-[0.44] pb-4 px-4 min-w-[600px]">
            <div className="col-span-1">Customer</div>
            <div className="col-span-1">Product</div>
            <div className="col-span-1">Amount</div>
            <div className="col-span-1">Qty</div>
            <div className="col-span-1">Status</div>
          </div>
          <div className="space-y-4 px-4 min-w-[600px]">
            {productOrders.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-5 gap-4 items-center text-black border-b border-[#DCE7F2] py-1 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onRowClick(order)}
              >
                <div className="col-span-1 flex flex-row items-center space-x-2">
                  <img 
                    src="/dashboard/purchaseicon.png" 
                    alt="Customer Icon" 
                    className="w-6 h-6 rounded-full"
                  />
                  <p className="text-sm">{order.customer}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm">{order.product}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm">{order.amount}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm">{order.qty}</p>
                </div>
                <div className="col-span-1">
                  <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={handlePageChange}
      />
    </div>
  );
}