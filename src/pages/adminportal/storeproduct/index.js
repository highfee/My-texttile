import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import Pending from "@/components/adminportal/adminsidebar/productdetails/Pending";
import Delivered from "@/components/adminportal/adminsidebar/productdetails/Delivered";
import Shipped from "@/components/adminportal/adminsidebar/productdetails/Shipped";
import ReturnRequest from "@/components/adminportal/adminsidebar/productdetails/ReturnRequest";
import AllOrders from "@/components/adminportal/adminsidebar/productdetails/AllOrders";
import PurchasesDetail from "@/components/dashboard/sidebarcomponents/Purchasesdetail";
const barData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 200 },
  { name: "Jun", value: 300 },
  { name: "Jul", value: 450 },
  { name: "Aug", value: 600 },
];

const lineData = [
  { name: "M", value: 1000 },
  { name: "T", value: 2000 },
  { name: "W", value: 3000 },
  { name: "T", value: 3200 },
  { name: "F", value: 3300 },
  { name: "S", value: 3800 },
  { name: "S", value: 4100 },
];
const tabs = [
  { id: "AllOrders", name: "All Orders" },
  { id: "Pending", name: "Pending" },
  { id: "Delivered", name: "Delivered" },
  { id: "Shipped", name: "Shipped" },
  { id: "ReturnRequest", name: "Return Request" },
];

const index = () => {
  const [activeTab, setActiveTab] = useState("AllOrders");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  const renderTabContent = () => {
    if (showDetail) {
      return <PurchasesDetail order={selectedOrder} onBack={handleBack} />;
    }

    switch (activeTab) {
      case "Pending":
        return <Pending onRowClick={handleRowClick} />;
      case "Delivered":
        return <Delivered onRowClick={handleRowClick} />;
      case "Shipped":
        return <Shipped onRowClick={handleRowClick} />;
      case "ReturnRequest":
        return <ReturnRequest onRowClick={handleRowClick} />;
      case "AllOrders":
      default:
        return <AllOrders onRowClick={handleRowClick} />;
    }
  };

  return (
    <div
      className="p-4 space-y-6 min-h-screen"
      style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {!showDetail && (
        <>
          <div className="col-span-2 lg:col-span-4 bg-bluebutton p-4 rounded-md">
            <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
              <div className="bg-[#DCE7F233] text-white rounded-xl px-4 py-2 text-left">
                <p>Total Orders</p>
                <p className="text-xl font-bold">1,234</p>
              </div>
              <div className="bg-[#DCE7F233] text-white rounded-xl px-4 py-2 text-left">
                <p>Pending</p>
                <p className="text-xl font-bold">123</p>
              </div>
              <div className="bg-[#DCE7F233] text-white rounded-xl px-4 py-2 text-left">
                <p>Delivered</p>
                <p className="text-xl font-bold">945</p>
              </div>
              <div className="bg-[#DCE7F233] text-white rounded-xl px-4 py-2 text-left">
                <p>Shipped</p>
                <p className="text-xl font-bold">345</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow">
              <p className="font-medium mb-2">Refund Request</p>
              <p className="text-2xl font-bold mb-4">84</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#0b5ed7"
                    radius={[2, 2, 0, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <p className="font-medium mb-2">Cancelled Orders</p>
              <p className="text-2xl font-bold mb-4">$4,123</p>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8f00ff"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-medium">Recent Orders</p>
                <p className="text-2xl font-bold">
                  56 <span className="text-green-500 text-sm">▲ 6.65%</span>
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-medium">Recent Delivered</p>
                <p className="text-2xl font-bold">
                  125 <span className="text-green-500 text-sm">▲ 6.65%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-row gap-2 text-sm font-medium mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab.id
                    ? "text-bluebutton"
                    : "text-graycolor opacity-[0.66]"
                }`}
              >
                {tab.name}
                {tab.id === "ReturnRequest" && (
                  <span className="ml-2 bg-bluebutton text-white rounded-full px-2 py-0.5 text-xs">
                    20
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Tab Content */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
};

export default index;
