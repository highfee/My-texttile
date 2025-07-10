import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaCheckSquare, FaRegTimesCircle } from "react-icons/fa";
import TierModal from "../../TierModal";
import { useViewAllTiers } from "@/store/apiCalls/useAdminStore";

const SubscriptionTiers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleManageClick = () => {
    console.log("Opening Tier Management Modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing Tier Management Modal");
    setIsModalOpen(false);
  };

  const { data: tiers, isLoading } = useViewAllTiers();

  // const tiers = [
  //   { name: "Tier 1", monthly: "$10", yearly: "$100", upgrade: "$5" },
  //   { name: "Tier 2", monthly: "$10", yearly: "$100", upgrade: "$5" },
  //   { name: "Tier 2", monthly: "$10", yearly: "$100", upgrade: "$5" },
  //   { name: "Tier 2", monthly: "$10", yearly: "$100", upgrade: "$5" },
  // ];

  const features = [
    {
      name: "Advanced Analytics",
      availability: [false, true, true, true],
    },
    {
      name: "Fast Payouts",
      availability: [true, false, false, true],
    },
    {
      name: "Campaign",
      availability: [true, true, true, true],
    },
    {
      name: "Affiliate Program",
      availability: [true, true, true, true],
    },
  ];

  return (
    <div className="lg:p-6 space-y-8">
      <div>
        <header className="flex items-center gap-20 w-[500px] justify-between">
          <div>
            <h2 className="text-lg font-semibold">Tier pricing</h2>
            <p className="text-sm text-gray-500">Help us know you better.</p>
          </div>

          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleManageClick}
          >
            Manage
          </Button>
        </header>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-[500px] border rounded-md table-auto">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left">Tier Name</th>
                <th className="px-4 py-2 text-left">Monthly price</th>
                <th className="px-4 py-2 text-left">Yearly price</th>
                {/* <th className="px-4 py-2 text-left">Upgrade fee</th> */}
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, index) => (
                <tr key={index} className="">
                  <td className="px-4 py-2">{tier.tier_name}</td>
                  <td className="px-4 py-2">{tier.price}</td>
                  <td className="px-4 py-2">{tier.price * 12}</td>
                  {/* <td className="px-4 py-2">{tier.upgrade}</td> */}
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
                  <th key={index} className="px-4 py-2 text-left">
                    Tier {index + 1}
                  </th>
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
                        <FaCheckSquare className="text-bluebutton" />
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

      {/* Tier Management Modal */}
      <TierModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SubscriptionTiers;
