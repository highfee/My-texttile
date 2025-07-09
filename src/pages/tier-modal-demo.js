import React, { useState } from 'react';
import TierModal from '../components/adminportal/TierModal';

const TierModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log('Opening Tier Modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing Tier Modal');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tier Modal Demo
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to open the tier management modal.
          <br />
          Check the browser console to see the input logging in action.
        </p>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Open Tier Modal
        </button>
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
          <h3 className="font-semibold text-gray-800 mb-2">Instructions:</h3>
          <ul className="text-sm text-gray-600 text-left space-y-1">
            <li>• Open the modal by clicking the button above</li>
            <li>• Type in any input field to see console logs</li>
            <li>• Each keystroke will log the field and value</li>
            <li>• Full form data is logged with each change</li>
            <li>• Click Update or Cancel to see final logs</li>
          </ul>
        </div>
      </div>

      <TierModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default TierModalDemo;