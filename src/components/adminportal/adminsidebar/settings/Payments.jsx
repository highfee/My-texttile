import React, { useState } from 'react';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

const Payments = () => {
  const [enabled24Hour, setEnabled24Hour] = useState(false);
  const [manualPayout, setManualPayout] = useState(true);
  const [tierCommission, setTierCommission] = useState(true);
  const [flagUnusual, setFlagUnusual] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState({
    Stripe: true,
    PayPal: true,
    USDT: true,
    BTC: false,
  });

  const togglePaymentMethod = (method) => {
    setPaymentMethods((prev) => ({ ...prev, [method]: !prev[method] }));
  };

  return (
    <div className="lg:p-6 space-y-8">
      {/* Payout processing time and Payment methods */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="space-y-4 flex-1">
          <h2 className="text-lg font-semibold">Payout processing time</h2>
          <p className="text-sm text-gray-500">Help us know you better.</p>

          <div>
            <label className="block text-sm font-medium mb-1">
              Standard Payout Time For Lower Tiers
            </label>
            <select className="border px-4 py-2 rounded-md w-full">
              <option>7 days processing time</option>
              <option>5 days processing time</option>
              <option>3 days processing time</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Enable 24-Hour Payout for Top-Tier Users.</span>
              <Switch
                checked={enabled24Hour}
                onChange={setEnabled24Hour}
                className={`${
                  enabled24Hour ? 'bg-blue-600' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    enabled24Hour ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <span>Manually approve/immediate Payout</span>
              <Switch
                checked={manualPayout}
                onChange={setManualPayout}
                className={`${
                  manualPayout ? 'bg-blue-600' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    manualPayout ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <span>Allow tier-based commissions</span>
              <Switch
                checked={tierCommission}
                onChange={setTierCommission}
                className={`${
                  tierCommission ? 'bg-blue-600' : 'bg-gray-300'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    tierCommission ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tax percentage</label>
              <select className="border px-4 py-2 rounded-md w-full">
                <option>10%</option>
                <option>15%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Commission percentage</label>
              <select className="border px-4 py-2 rounded-md w-full">
                <option>20%</option>
                <option>25%</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum withdrawal amount
              </label>
              <select className="border px-4 py-2 rounded-md w-full">
                <option>$20</option>
                <option>$50</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tax Percentage</label>
              <select className="border px-4 py-2 rounded-md w-full">
                <option>10%</option>
                <option>20%</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span>
              Auto-flag unusual payout requests
              <span className="text-pink-600"> (large, frequent withdrawals)</span>
            </span>
            <Switch
              checked={flagUnusual}
              onChange={setFlagUnusual}
              className={`${
                flagUnusual ? 'bg-blue-600' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  flagUnusual ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 w-full md:w-1/3">
          <h2 className="text-lg font-semibold">Payment methods</h2>
          <p className="text-sm text-graycolor">Help us know you better.</p>

          {Object.keys(paymentMethods).map((method) => (
            <div
              key={method}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => togglePaymentMethod(method)}
            >
              {paymentMethods[method] ? (
                <FaCheckSquare className="text-blue-600" />
              ) : (
                <FaRegSquare className="text-gray-400" />
              )}
              <span>{method}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Based Commission Table */}
      <div>
        <h2 className="text-lg font-semibold">Tier-Based Commission</h2>
        <p className="text-sm text-gray-500">Help us know you better.</p>
        <div className="overflow-x-auto mt-4 border rounded-lg w-full md:w-1/2">
          <table className="min-w-full table-auto">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left">Creators Tier</th>
                <th className="px-4 py-2 text-left">Commissions %</th>
              </tr>
            </thead>
            <tbody>
              {[
                { tier: 'Tier 1', commission: '5%' },
                { tier: 'Tier 2', commission: '10%' },
                { tier: 'Tier 2', commission: '20%' },
                { tier: 'Tier 2', commission: '24%' },
              ].map((row, idx) => (
                <tr key={idx} className="">
                  <td className="px-4 py-2">{row.tier}</td>
                  <td className="px-4 py-2">{row.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
