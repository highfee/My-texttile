import React from 'react';
import { FaCheckSquare, FaRegTimesCircle } from 'react-icons/fa';

const SubscriptionTiers = () => {
  const tiers = [
    { name: 'Tier 1', monthly: '$10', yearly: '$100', upgrade: '$5' },
    { name: 'Tier 2', monthly: '$10', yearly: '$100', upgrade: '$5' },
    { name: 'Tier 2', monthly: '$10', yearly: '$100', upgrade: '$5' },
    { name: 'Tier 2', monthly: '$10', yearly: '$100', upgrade: '$5' },
  ];

  const features = [
    {
      name: 'Advanced Analytics',
      availability: [false, true, true, true],
    },
    {
      name: 'Fast Payouts',
      availability: [true, false, false, true],
    },
    {
      name: 'Campaign',
      availability: [true, true, true, true],
    },
    {
      name: 'Affiliate Program',
      availability: [true, true, true, true],
    },
  ];

  return (
    <div className="lg:p-6 space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Tier pricing</h2>
        <p className="text-sm text-gray-500">Help us know you better.</p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-[500px] border rounded-md table-auto">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left">Tier Name</th>
                <th className="px-4 py-2 text-left">Monthly price</th>
                <th className="px-4 py-2 text-left">Yearly price</th>
                <th className="px-4 py-2 text-left">Upgrade fee</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-2">{tier.name}</td>
                  <td className="px-4 py-2">{tier.monthly}</td>
                  <td className="px-4 py-2">{tier.yearly}</td>
                  <td className="px-4 py-2">{tier.upgrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Features */}
      <div>
        <h2 className="text-lg font-semibold">Plan Features</h2>
        <p className="text-sm text-gray-500">Help us know you better.</p>
        <div className="overflow-x-auto mt-4 rounded-lg">
          <table className="min-w-[500px] border rounded-md  table-auto">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left">Feature</th>
                {tiers.map((_, index) => (
                  <th key={index} className="px-4 py-2 text-left">Tier {index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-2">{feature.name}</td>
                  {feature.availability.map((available, idx) => (
                    <td key={idx} className="px-4 py-2">
                      {available ? (
                        <FaCheckSquare className="text-blue-600" />
                      ) : (
                        <FaRegTimesCircle className="text-pink-600" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-row gap-4">
        <div>
          <label className="block mb-1 text-sm">Billing Cycle</label>
          <select className="border px-4 py-2 rounded-md">
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm">Set Discount</label>
          <select className="border px-4 py-2 rounded-md">
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
