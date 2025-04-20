import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiCreditCard } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { GoArrowDownLeft } from "react-icons/go";

const BARCOLORS = ["#AF52DE", "#016FDE", "#FD9D49", "#121212"];
const BAR_COLORS = ["#AF52DE", "#10B981", "#FF3B30"];

const PieChartData = [
  { name: "Tier 1", value: 600 },
  { name: "Tier 2", value: 400 },
  { name: "Tier 3", value: 100 },
  { name: "Tier 4", value: 200 },
];

const BarChartData = [
  { name: "Campaign", value: 23, fill: BAR_COLORS[0] },
  { name: "Payout", value: 16, fill: BAR_COLORS[1] },
  { name: "Products", value: 28, fill: BAR_COLORS[2] },
];

const TopCreatorsData = [
  {
    name: "John Blim",
    products: 65,
    "t.sales": "$3,425",
    image: "/adminportal/admindashboard/table1.svg",
  },
  {
    name: "Sarah Johnson",
    products: 42,
    "t.sales": "$2,100",
    image: "/adminportal/admindashboard/table2.svg",
  },
  {
    name: "Michael Smith",
    products: 31,
    "t.sales": "$1,750",
    image: "/adminportal/admindashboard/table3.svg",
  },
  {
    name: "Emily Davis",
    products: 50,
    "t.sales": "$2,950",
    image: "/adminportal/admindashboard/table4.svg",
  },
];

const ApprovedCampaignsData = [
  {
    name: "MemeTrump",
    creator: "Lucas Green",
    "total votes": "23,765",
    image: "/adminportal/admindashboard/table1.svg",
  },
  {
    name: "Just Woke",
    creator: "Mia Thompson",
    "total votes": "2,100",
    image: "/adminportal/admindashboard/table2.svg",
  },
  {
    name: "Boss Lady Collection",
    creator: "Olivia Martinez",
    "total votes": "4,765",
    image: "/adminportal/admindashboard/table3.svg",
  },
  {
    name: "Weekend Vibes",
    creator: "Sophia Lee",
    "total votes": "950",
    image: "/adminportal/admindashboard/table4.svg",
  },
];

const ApprovedProductsData = [
  {
    name: "MemeTrump",
    creator: "Lucas Green",
    sales: "$3,765",
    image: "/adminportal/admindashboard/tab1.svg",
  },
  {
    name: "Just Woke",
    creator: "Mia Thompson",
    sales: "$100",
    image: "/adminportal/admindashboard/tab2.svg",
  },
  {
    name: "Boss Lady Collection",
    creator: "Olivia Martinez",
    sales: "$4,765",
    image: "/adminportal/admindashboard/tab3.svg",
  },
  {
    name: "Weekend Vibes",
    creator: "Sophia Lee",
    sales: "$750",
    image: "/adminportal/admindashboard/tab4.svg",
  },
];

const AlertQueriesData = [
  { name: "Campaign", value: 23 },
  { name: "Payout", value: 16 },
  { name: "Products", value: 28 },
];

const AlertDetailsData = [
  {
    name: "Lucas Green",
    creator: "MemeTrump",
    "total votes": 23765,
    image: "/adminportal/admindashboard/table1.svg",
  },
  {
    name: "Mia Thompson",
    creator: "Just Woke",
    "total votes": 2100,
    image: "/adminportal/admindashboard/table2.svg",
  },
  {
    name: "Olivia Martinez",
    creator: "Boss Lady Collection",
    "total votes": 4765,
    image: "/adminportal/admindashboard/table3.svg",
  },
  {
    name: "Sophia Lee",
    creator: "Weekend Vibes",
    "total votes": 950,
    image: "/adminportal/admindashboard/table4.svg",
  },
];

const AffiliateProgramData = {
  totalReferrals: "2156",
  totalEarnings: "1236",
};

const InfoCard = ({ icon, title, value, color }) => (
  <div
    className={`rounded-md shadow-sm p-2 flex items-center space-x-2 py-2 lg:py-4`}
    style={{ backgroundColor: color }}
  >
    <div
      className={`w-12 h-12 rounded-full bg-white text-[${color}] flex items-center justify-center`}
    >
      <p className="text-xl">{icon}</p>
    </div>
    <div>
      <p className="text-sm text-[#12121280]">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  </div>
);

const PieChartWidget = ({ data, colors, title }) => (
  <div className="bg-white rounded-md shadow-sm p-4 flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button className="text-blue-500 text-sm">View more</button>
    </div>
    <div className="flex flex-row gap-4 items-center justify-center ">
      <div className="w-4/6">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-4 text-sm text-gray-600 flex flex-col justify-center">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center py-1">
            <div
              className="w-3 h-3 mr-2"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const TableWidget = ({ title, data, columns, imageKey }) => {
  const [clickedRow, setClickedRow] = React.useState(null);

  const handleRowClick = (itemName) => {
    setClickedRow(itemName);
  };

  return (
    <div className=" flex flex-col">
      <div className="flex bg-white p-1 rounded-md justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-bluebutton text-[14px]">View more</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              {columns.map((column) => (
                <th key={column} className="py-2 pr-4 text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.name}
                className={`bg-white border-b border-gray-200 cursor-pointer transition-colors duration-200
                  hover:bg-blue-100
                  ${clickedRow === item.name ? "bg-blue-300" : ""}`}
                onClick={() => handleRowClick(item.name)}
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className={`py-2 p-2 pr-4 ${
                      columns.indexOf(column) === 0 && imageKey
                        ? "flex items-center"
                        : ""
                    }`}
                  >
                    {columns.indexOf(column) === 0 &&
                      imageKey &&
                      item[imageKey] && (
                        <img
                          src={item[imageKey]}
                          alt={item.name}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                      )}
                    <span
                      className={
                        columns.indexOf(column) === 0 ? "font-medium" : ""
                      }
                    >
                      {item[column.toLowerCase()]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AlertsWidget = ({ barData, details }) => (
  <div className="  p-2 flex flex-col w-full md:w-5/6">
    <div className="flex bg-white p-1 space-y-2 rounded-md justify-between items-center">
      <h2 className="text-lg font-semibold">
        Alerts Widget{" "}
        <span className="text-sm text-gray-500">(unresolved tickets)</span>
      </h2>
      <button className="text-blue-500 text-sm">view more</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-2">
      <div className="bg-gray-50 rounded-md p-4">
        <h3 className="text-xl font-semibold mb-3">
          Queries{" "}
          <span className="text-3xl font-bold text-gray-800 ml-2">
            {barData.length}
          </span>
        </h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={BarChartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              style={{ fontSize: "0.8rem", color: "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f3f4f6",
                padding: "8px",
                borderRadius: "4px",
              }}
              itemStyle={{ color: "#4b5563" }}
            />
            <Bar dataKey="value" radius={[5, 5, 0, 0]}>
              {BarChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col p-2">
        <div className="text-gray-500 flex flex-row items-center pb-2 border-b border-gray-200">
          <div className="w-1/6  flex-shrink-0"></div>
          <p className="font-semibold w-1/3 pr-2 flex-shrink-0">Name</p>
          <p className="font-semibold w-1/3 pr-2 flex-shrink-0">Creator</p>
          <p className="font-semibold  text-right flex-shrink-0">Total votes</p>
        </div>
        <div className="overflow-y-auto bg-white">
          {details.map((alert) => (
            <div
              key={alert.name}
              className={`py-2 p-2 flex items-center text-sm cursor-pointer transition-colors duration-200
                hover:bg-blue-100
                ${false ? "bg-blue-300 text-white" : ""}`} // You can implement click logic here if needed
              onClick={() => {
                // Handle click action for alert details
              }}
            >
              <div className="w-1/6 pr-2">
                <img
                  src={alert.image}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              </div>
              <p className="w-1/3 text-gray-700">{alert.name}</p>
              <p className="w-1/3 text-gray-700">{alert.creator}</p>
              <p className="w-1/6 text-right text-gray-700">
                {alert["total votes"]?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AffiliateProgramWidget = ({ data }) => (
  <div className="bg-bluebutton rounded-md shadow-md p-4 flex flex-col w-full md:w-1/3">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-semibold text-white">Affiliate Program</h2>
      <button className="text-white text-sm">view more</button>
    </div>
    <div className="flex flex-col space-y-3">
      <div className="bg-[#DCE7F226] border border-[#DCE7F280] rounded-md p-4 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full p-1 bg-white text-bluebutton flex items-center justify-center">
          <AiOutlineUsergroupAdd size="md" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-white opacity-70">Total Referrals</p>
          <h3 className="text-xl font-semibold text-white">
            {data.totalReferrals}{" "}
            <span className="text-green-400 text-sm align-top">▲ 6.65%</span>
          </h3>
        </div>
      </div>
      <div className="bg-[#DCE7F226] border border-[#DCE7F280] rounded-md p-4 flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-white text-bluebutton p-1 flex items-center justify-center">
          <PiCreditCard size="md" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-white opacity-70">Total Earnings</p>
          <h3 className="text-xl font-semibold text-white">
            {data.totalEarnings}{" "}
            <span className="text-green-400 text-sm align-top">▲ 6.65%</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#F7F8FA] p-2 lg:p-6 "style={{
        overflowY: 'auto',
        scrollbarWidth: 'none',  /* Firefox */
        msOverflowStyle: 'none',  /* IE and Edge */
      }}
    >
      {/* Add this style tag to hide scrollbar in WebKit browsers */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <InfoCard
            icon={<HiOutlineUsers size={24} />}
            title="All Users"
            value="12,000"
            color="#00C7BE"
          />
          <InfoCard
            icon={<PiCurrencyDollarSimple size={24} />}
            title="Total Payout"
            value="$2,100"
            color="#FF5789"
          />
          <InfoCard
            icon={<HiOutlineMegaphone size={24} />}
            title="Live Campaigns"
            value="321"
            color="#FD9D49"
          />
          <InfoCard
            icon={<GoArrowDownLeft size={24} />}
            title="Total sales"
            value="$24,321"
            color="#10B981"
          />
        </div>
        <PieChartWidget
          data={PieChartData}
          colors={BARCOLORS}
          title="Sales Distribution by Tier"
        />
        <TableWidget
          title="Top Creators"
          data={TopCreatorsData}
          columns={["Name", "Products", "T.Sales"]}
          imageKey="image"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableWidget
          title="Recently Approved Campaigns"
          data={ApprovedCampaignsData}
          columns={["Name", "Creator", "Total votes"]}
          imageKey="image"
        />
        <TableWidget
          title="Recently Approved Products"
          data={ApprovedProductsData}
          columns={["Name", "Creator", "Sales"]}
          imageKey="image"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <AlertsWidget barData={AlertQueriesData} details={AlertDetailsData} />
        <AffiliateProgramWidget data={AffiliateProgramData} />
      </div>
    </div>
  );
};

export default Dashboard;
