import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AffiliateProgram = () => {
  const barData = [
    { name: 'M', referrals: 5 },
   
    { name: 'W', referrals: 25 },
    { name: 'T', referrals: 40 },
    { name: 'F', referrals: 20 },
    { name: 'S', referrals: 5 },
    { name: 'T', referrals: 10 },
    { name: 'F', referrals: 20 },
  ];
  const lineData = [
    { month: 'Jan', earnings: 140, referrals: 120 },
    { month: 'Feb', earnings: 150, referrals: 115 },
    { month: 'Mar', earnings: 150, referrals: 110 },
    { month: 'Apr', earnings: 170, referrals: 163 },
    { month: 'May', earnings: 190, referrals: 185 },
    { month: 'Jun', earnings: 205, referrals: 200 },
  ];
  const activities = [
    { 
      user: 'Esther Howard', 
      avatar: '/dashboard/campaign/Ellipse1.svg',
      product: 'Tinker T-shirt', 
      price: '$16.99', 
      commission: '$4.2' 
    },
    { 
      user: 'Esther Howard', 
      avatar: '/dashboard/campaign/Ellipse2.svg',
      product: 'Tinker T-shirt', 
      price: '$16.99', 
      commission: '$4.2' 
    },
    { 
      user: 'Esther Howard', 
      avatar: '/dashboard/campaign/Ellipse3.png',
      product: 'Tinker T-shirt', 
      price: '$16.99', 
      commission: '$4.2' 
    },
    { 
      user: 'Esther Howard', 
      avatar: '/dashboard/campaign/Ellipse4.png',
      product: 'Tinker T-shirt', 
      price: '$16.99', 
      commission: '$4.2' 
    },
  ];

  return (
    <div className="lg:px-10  px-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Affiliate Program</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/3 p-4  bg-bluebutton rounded-lg py-10">
          <h2 className="text-xl font-bold text-white mb-2">EARN BY INVITING FRIENDS AND FAMILY TO OWNEST</h2>
          <p className="text-white">
            This is our Friends and family to join Ownest and staff serving rewards! Share your unique affiliate for
            an outs, easy outlimate communications when they make their first purchases a sale. It's an easy and
            rewarding way to grow the current equivalent team income.
          </p>
        </div>
        
        <div className="w-full md:w-1/3 border p-6 border-[#12121270] rounded-lg">
          <h3 className="font-xl font-semibold 0 mb-4">Affiliate Info</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold">Referral link</p>
              <p className="text-bluebutton truncate underline">https://ownest.com/ref/yourlink</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Total Referral User</p>
              <p className="font-bold">64</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Weekly Referrals</h3>
            <p className="text-sm text-gray-500">The Month Last Month: 24</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="referrals" fill="#016FDE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Monthly Performance</h3>
            <p className="text-sm text-gray-500">Risk Analysis</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#016FDE" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="referrals" stroke="#FF5789" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-4">Activities</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-graycolor uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-graycolor uppercase tracking-wider">Purchase</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-graycolor uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-graycolor uppercase tracking-wider">Commission</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900  ">
                    <div className="flex items-center">
                      <img 
                        src={activity.avatar} 
                        alt={activity.user} 
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                      {activity.user}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm ">{activity.product}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm ">{activity.price}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm opacity-[0.44] font-medium">{activity.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;