import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { BiStoreAlt } from "react-icons/bi";
import { topSellingProducts, barChartData1, barChartData2, lineChartData, orderStatusData } from "@/data/adminData/userData/analytics";
const index = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="px-6 py-6 lg:px-10">
      <div className="block lg:hidden py-6">
        <p className="text-2xl font-bold text-graycolor">Payout</p>
      </div>
      <div className="hidden lg:flex justify-between items-center rounded-lg py-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-gray-500 text-sm">Your store performance</p>
        </div>
        <div className="relative flex items-center bg-white border rounded-full px-4 py-2 ">
          <FaRegCalendarAlt className="h-5 w-5 text-graycolor opacity-[0.44] mr-2" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            className="focus:outline-none w-[180px] text-gray-700"
          />
          <IoIosArrowDown className="text-graycolor opacity-[0.44]" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="py-4 px-6">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-lg text-graycolor opacity-[0.44] pb-2">
                Revenue
              </h3>
              <div className="flex items-center  ">
                <FaArrowTrendUp className="border border-graycolor rounded-lg opacity-[0.44] text-[30px] p-1" />
              </div>
            </div>
            <p className="text-2xl text-graycolor font-bold">$0</p>
          </div>
          <div className="lg:h-48 h-36 px-10 py-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData1} barCategoryGap="20%">
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="url(#gradient)"
                  radius={[20, 20, 20, 20]}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#C8C7FE" />
                    <stop offset="100%" stopColor="#016FDE" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="py-4 px-6">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-lg text-graycolor opacity-[0.44] pb-2">
                Payout
              </h3>
              <div className="flex items-center  ">
                <FaArrowTrendDown className="border border-graycolor rounded-lg opacity-[0.44] text-[30px] p-1" />
              </div>
            </div>

            <p className="text-2xl text-graycolor font-bold">$0</p>
          </div>
          <div className="lg:h-48 h-36 px-10 py-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData2} barCategoryGap="20%">
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="url(#gradient2)"
                  radius={[20, 20, 20, 20]}
                />
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#FF57894A" />
                    <stop offset="100%" stopColor="#FF5789" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="py-4 px-6">
          <div className="flex flex-row justify-between items-center">
              <h3 className="text-lg text-graycolor opacity-[0.44] pb-2">
                Sales
              </h3>
              <div className="flex items-center  ">
                <BiStoreAlt className="opacity-[0.44] text-[25px]" />
              </div>
            </div>
            <p className="text-2xl text-graycolor font-bold">$0</p>
          </div>
          <div className="lg:h-48 h-36 px-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 1, 2, 3, 4]}
                  tickFormatter={(value) => `${value}K`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#gradient3)"
                  strokeWidth={5}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="gradient3" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#016FDE" />
                    <stop offset="100%" stopColor="#FF5789" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white flex flex-row items-center justify-between shadow-md p-4 rounded-xl">
            <div className="w-[60%]">
              <h3 className="text-lg font-semibold mb-2">Order status</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={orderStatusData} dataKey="value" outerRadius={60}>
                    {orderStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-[40%] flex flex-col space-y-1">
              {orderStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 inline-block rounded-sm"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">New Products</h3>
                <p className="text-3xl font-bold py-4">53</p>
                <p className="text-xs text-gray-500">
                  From last 7 days (Mar. 2025)
                </p>
              </div>
              <div className="flex items-center text-[#00D945] bg-[#74FFB033] rounded-full py-1 px-1 font-bold">
                <ArrowUpRight className="w-5 h-5" /> 25%
              </div>
            </div>
            <div className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Conversion Rate</h3>
                <p className="text-3xl font-bold py-4">86%</p>
                <p className="text-xs text-gray-500">
                  From last 7 days (Mar. 2025)
                </p>
              </div>
              <div className="flex items-center text-[#FE007F] bg-[#FE007F33] rounded-full py-1 px-2 font-bold">
                <ArrowDownRight className="w-5 h-5" /> 2%
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-xl">
            <h3 className="text-lg font-semibold">Top Selling Product</h3>
            <table className="w-full mt-3 text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">T. Sales</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">{item.qty}</td>
                    <td className="py-2">{item.sales}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
