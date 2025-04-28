import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Createaccount from "./Createaccount"; 

const Namespopup = ({ onBack }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreateAccount(true);
  };

  if (showCreateAccount) {
    return <Createaccount 
             onBack={() => setShowCreateAccount(false)} 
             userData={formData} 
           />;
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden w-full max-w-[850px] min-h-[400px] md:h-[572px]">
      {/* Left Column - Form */}
      <div className="flex flex-col items-start p-6 md:p-8 w-full md:w-1/2">
        <button 
          onClick={onBack}
          className="text-black hover:text-gray-600 transition-colors"
          aria-label="Go back"
        >
          <FaArrowLeftLong size={20} />
        </button>

        <div className="py-4 md:py-8 lg:py-12 w-full">
          <h1 className="font-bold text-black text-2xl md:text-3xl lg:text-[30px] mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-700 text-sm md:text-base">
            We'll check if you have an account with us, and help create one for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <label htmlFor="firstName" className="font-bold block mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="font-bold block mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full pt-4">
            <button
              type="submit"
              className="w-full py-2 md:py-3 rounded-lg text-white bg-bluebutton  transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:block w-full md:w-1/2 bg-gray-100">
        <img
          src="/signup/login.png"
          alt="Person using computer"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Namespopup;