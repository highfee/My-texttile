import React, { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  useCreateTier,
  useUpdateTierPrice,
  useViewAllTiers,
} from "@/store/apiCalls/useAdminStore";
import { Input } from "../ui/input";

const TierModal = ({ isOpen, onClose }) => {
  const [updatingAll, setUpdatingAll] = useState(false);

  const { data: tiers, isLoading } = useViewAllTiers();

  const {
    mutate: createTier,
    isPending: creatingTier,
    isSuccess: tierCreated,
  } = useCreateTier();

  const {
    mutate: updateTier,
    isPending: updatingTier,
    tierUpdated,
  } = useUpdateTierPrice();

  const [formData, setFormData] = useState({});
  const [showAddTierModal, setShowAddTierModal] = useState(false);
  const [newTier, setNewTier] = useState({ tier_name: "tier2", price: "" });

  const freeTier = [
    {
      id: "free",
      tier_name: "Free",
      price: "0.00",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_by: null,
      created_by: null,
    },
  ];

  useEffect(() => {
    if (isOpen && tiers) {
      const freeTier = [
        {
          id: "free",
          tier_name: "Free",
          price: "0.00",
        },
      ];
      const allTiers = [...freeTier, ...tiers];
      // Create an object: { [tier_name]: { id, name: tier_name, price: price } }
      const initialData = {};
      allTiers.forEach((tier) => {
        initialData[tier.tier_name] = {
          id: tier.id,
          name: tier.tier_name,
          price: tier.price || "",
        };
      });
      setFormData(initialData);
    }
  }, [isOpen, tiers]);

  console.log(formData);

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        name: value,
      },
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        price: value,
      },
    }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAddTier = () => {
    setShowAddTierModal(true);
  };

  const handleAddTierClose = () => {
    setShowAddTierModal(false);
    setNewTier({ tier_name: "tier2", price: "" });
  };

  const handleNewTierChange = (e) => {
    const { name, value } = e.target;
    setNewTier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setUpdatingAll(true);
    const tierNames = Object.keys(formData).filter((name) => name !== "Free");

    console.log(tierNames, formData);

    for (const tierName of tierNames) {
      await new Promise((resolve) => {
        updateTier(
          {
            id: formData[tierName].id,
            tier_name: formData[tierName].name,
            price: formData[tierName].price,
          },
          {
            onSuccess: resolve,
            onError: resolve, // resolve even on error to continue loop
          }
        );
      });

      // console.log(formData[tierName].price);
    }
    setUpdatingAll(false);
    handleCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          <div className="p-6">
            {/* Tier Names Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tier Name</h3>
              <div className="grid grid-cols-2 gap-6">
                {[...freeTier, ...tiers].map((tier, i) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tier {i + 1}
                    </label>
                    <Input
                      type="text"
                      name={tier.tier_name}
                      value={formData[tier.tier_name]?.name || ""}
                      onChange={handleNameChange}
                      className="w-full"
                      // disabled={tier.tier_name === "Free"}
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Price Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Monthly Price</h3>
              <div className="grid grid-cols-2 gap-6">
                {tiers.map((tier, i) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {tier.tier_name.toUpperCase()}
                    </label>
                    <Input
                      type="text"
                      name={tier.tier_name}
                      placeholder="$10"
                      value={formData[tier.tier_name]?.price || ""}
                      onChange={handlePriceChange}
                      className="w-full"
                      // disabled={tier.tier_name === "Free"}
                      // disabled={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Fee Section */}
            {/* <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Upgrade Fee</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier 1
                </label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier1}
                  onChange={(e) =>
                    handleInputChange("upgradeFees", "tier1", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier 2
                </label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier2}
                  onChange={(e) =>
                    handleInputChange("upgradeFees", "tier2", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier 3
                </label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier3}
                  onChange={(e) =>
                    handleInputChange("upgradeFees", "tier3", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tier 4
                </label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier4}
                  onChange={(e) =>
                    handleInputChange("upgradeFees", "tier4", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div> */}

            {/* Footer Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                onClick={handleAddTier}
                className="text-red-500 font-medium hover:text-red-600"
              >
                Add Tier
              </button>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} disabled={updatingAll}>
                  {updatingAll ? <Loader className="animate-spin" /> : "Update"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddTierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-4">Add New Tier</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Tier Name
              </label>
              <select
                name="tier_name"
                value={newTier.tier_name}
                onChange={handleNewTierChange}
                className="w-full border rounded px-2 py-1"
              >
                <option value="tier2">Tier 2</option>
                <option value="tier3">Tier 3</option>
                <option value="tier4">Tier 4</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={newTier.price}
                onChange={handleNewTierChange}
                className="w-full border rounded px-2 py-1"
                placeholder="$0.00"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                onClick={handleAddTierClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  createTier({
                    tier_name: newTier.tier_name,
                    price: newTier.price,
                  });
                  tierCreated && handleAddTierClose();
                }}
                disabled={newTier.price.length < 1}
              >
                {creatingTier ? <Loader className="animate-spin" /> : "Add"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TierModal;
