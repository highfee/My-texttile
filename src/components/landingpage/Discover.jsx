import React from 'react';

const Discover = () => {
  return (
    <section className="py-6 bg-[#EFF4F8] flex  items-center justify-center">
      <div className="flex flex-col items-center text-center md:grid md:grid-cols-2 md:text-left px-6 md:px-16 gap-8  mx-auto">
        <div className="flex flex-col justify-center space-y-6  ">
          <h2 className="text-3xl md:text-[50px] md:leading-[80px] font-bold text-gray-800">
            Discover and Shop from Unique Creations
          </h2>
          <p className="text-base text-gray-600">
            Discover unique products crafted by talented creators. From custom apparel to 
            exclusive designs, find something special while supporting the creators you love.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors w-fit mx-auto md:mx-0">
            Visit Store
          </button>
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <img
            src="/landingpage/discover.svg"
            alt="Discover MyTextil"
            className="w-full max-w-[469px] h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Discover;