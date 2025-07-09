import React, { useState } from 'react';
import { X } from 'lucide-react';

const TierModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    tierNames: {
      tier1: '',
      tier2: '',
      tier3: '',
      tier4: ''
    },
    monthlyPrices: {
      tier1: '',
      tier2: '',
      tier3: '',
      tier4: ''
    },
    upgradeFees: {
      tier1: '',
      tier2: '',
      tier3: '',
      tier4: ''
    }
  });

  const handleInputChange = (section, tier, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [tier]: value
      }
    }));
    
    // Console log the input as requested
    console.log(`${section}.${tier}:`, value);
    console.log('Full form data:', {
      ...formData,
      [section]: {
        ...formData[section],
        [tier]: value
      }
    });
  };

  const handleCancel = () => {
    console.log('Modal cancelled');
    onClose();
  };

  const handleUpdate = () => {
    console.log('Update clicked - Final form data:', formData);
    // Here you would typically call an API to update the tiers
    onClose();
  };

  const handleAddTier = () => {
    console.log('Add Tier clicked');
    // Logic to add a new tier would go here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex space-x-8">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
              General
            </button>
            <button className="text-gray-600 px-4 py-2 font-medium">
              Subscription & Tiers
            </button>
            <button className="text-gray-600 px-4 py-2 font-medium">
              Commission
            </button>
            <button className="text-gray-600 px-4 py-2 font-medium">
              Payments
            </button>
            <button className="text-gray-600 px-4 py-2 font-medium">
              Support
            </button>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tier Names Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Tier Name</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 1</label>
                <input
                  type="text"
                  placeholder="Tier 1"
                  value={formData.tierNames.tier1}
                  onChange={(e) => handleInputChange('tierNames', 'tier1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 2</label>
                <input
                  type="text"
                  placeholder="Tier 1"
                  value={formData.tierNames.tier2}
                  onChange={(e) => handleInputChange('tierNames', 'tier2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 3</label>
                <input
                  type="text"
                  placeholder="Tier 1"
                  value={formData.tierNames.tier3}
                  onChange={(e) => handleInputChange('tierNames', 'tier3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 4</label>
                <input
                  type="text"
                  placeholder="Tier 1"
                  value={formData.tierNames.tier4}
                  onChange={(e) => handleInputChange('tierNames', 'tier4', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Monthly Price Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Monthly Price</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 1</label>
                <input
                  type="text"
                  placeholder="$10"
                  value={formData.monthlyPrices.tier1}
                  onChange={(e) => handleInputChange('monthlyPrices', 'tier1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 2</label>
                <input
                  type="text"
                  placeholder="$10"
                  value={formData.monthlyPrices.tier2}
                  onChange={(e) => handleInputChange('monthlyPrices', 'tier2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 3</label>
                <input
                  type="text"
                  placeholder="$10"
                  value={formData.monthlyPrices.tier3}
                  onChange={(e) => handleInputChange('monthlyPrices', 'tier3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 4</label>
                <input
                  type="text"
                  placeholder="$10"
                  value={formData.monthlyPrices.tier4}
                  onChange={(e) => handleInputChange('monthlyPrices', 'tier4', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Upgrade Fee Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Upgrade Fee</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 1</label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier1}
                  onChange={(e) => handleInputChange('upgradeFees', 'tier1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 2</label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier2}
                  onChange={(e) => handleInputChange('upgradeFees', 'tier2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 3</label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier3}
                  onChange={(e) => handleInputChange('upgradeFees', 'tier3', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tier 4</label>
                <input
                  type="text"
                  placeholder="$100"
                  value={formData.upgradeFees.tier4}
                  onChange={(e) => handleInputChange('upgradeFees', 'tier4', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center pt-6">
            <button 
              onClick={handleAddTier}
              className="text-red-500 font-medium hover:text-red-600"
            >
              Add Tier
            </button>
            <div className="flex space-x-3">
              <button 
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierModal;