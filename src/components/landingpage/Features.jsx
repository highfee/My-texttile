const Features = () => {
  return (
    <div className="flex justify-center font-inter font-normal">
      <div className="flex flex-col items-center bg-white py-12 px-4 md:px-44 w-full">
        <h2 className="text-2xl font-bold text-center">FEATURES</h2>
        <p className="text-[#12121270] text-center text-[16px] ">
          Everything you need to create, sell, and grow in one place.
        </p>
        <div className="flex flex-col md:hidden gap-4 w-full pt-8">
          <div className="bg-gradient-to-br from-black via-black via-50% to-[#016FDE] pl-2 pt-4 text-white rounded-lg flex flex-row items-center shadow-lg">
            <div className="flex flex-col items-start">
              <p className="text-[14px] font-semibold">PRINT-ON-DEMAND TOOLS</p>
              <p className="text-[14px] text-white opacity-[0.66]">
                Effortlessly design and sell custom products without upfront
                inventory costs.
              </p>
            </div>
            <div className="w-[331px]  overflow-hidden">
              <img
                src="/landingpage/features.svg"
                alt="Print-on-Demand"
                className="object-cover h-full w-full translate-x-1/4"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE] text-white py-10 rounded-lg flex-1 flex flex-col items-center text-center shadow-lg text-[12px]">
              <h3 className=" font-semibold">CUSTOMIZEABLE STORES</h3>
              <p className=" text-white opacity-[0.66] font-inter font-normal text-sm leading-[19.6px] tracking-[-1px]">
                Effortlessly design and sell custom products without upfront
                inventory costs.
              </p>
            </div>

            <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE] text-white py-10  rounded-lg flex-1 flex flex-col items-center text-center shadow-md text-[12px]">
              <h3 className=" font-semibold">AFFILIATE PROGRAM</h3>
              <p className=" text-white opacity-[0.66]  text-sm leading-[19.6px] tracking-[-1px]">
                Expand your reach and earnings with built-in referral tools.
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full ">
            <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE] text-white py-10 px-2 rounded-lg flex-1 flex flex-col items-center text-center shadow-lg text-[12px]">
              <h3 className=" font-semibold">ADVANCED ANALYTICS</h3>
              <p className="text-white opacity-[0.66] ">
                Effortlessly design and sell custom products without upfront
                inventory costs.
              </p>
            </div>

            <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE] text-white py-10 px-1  rounded-lg flex-1 flex flex-col items-center text-center shadow-md text-[12px]">
              <h3 className=" font-semibold">AFFILIATE PROGRAM</h3>
              <p className="text-white opacity-[0.66] ">
                Expand your reach and earnings with built-in referral tools..
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE]  text-white p-4 rounded-lg flex flex-col items-start text-left shadow-md">
            <h3 className="text-lg font-semibold">CONNECT WITH COMMUNITY</h3>
            <p className="text-sm text-white opacity-[0.66]">
              Be part of the process! Participate in campaigns where creators
              share their ideas, the community votes on favourites, and
              exclusive designs come to life.
            </p>
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 gap-6 w-full pt-8">
          <div className="col-span-2 bg-gradient-to-br from-black via-black via-50% to-[#016FDE]  pl-8 pt-4 text-white rounded-lg flex flex-row items-center gap-6 shadow-lg">
            <div className="flex flex-col items-start flex-1">
              <h3 className="text-lg font-semibold">PRINT-ON-DEMAND TOOLS</h3>
              <p className="text-[16px] text-white opacity-[0.66]">
                Effortlessly design and sell custom products without upfront
                inventory costs
              </p>
            </div>
            <img
              src="/landingpage/features.svg"
              alt="Print-on-Demand"
              className="w-[261px] h-[230px]"
            />
          </div>

          <div className="bg-gradient-to-bl from-black via-black via-50% to-[#016FDE] py-16 px-4   text-white  rounded-lg flex flex-col items-center text-center shadow-lg">
            <h3 className="text-lg font-semibold">ADVANCED ANALYTICS</h3>
            <p className="text-[16px] text-white opacity-[0.66]">
              Effortlessly design and sell custom products without upfront
              inventory costs.
            </p>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-6">
            <div className="bg-black  text-white  rounded-lg flex flex-col py-16 px-4  items-center text-center shadow-md">
              <h3 className="text-lg font-semibold">CUSTOMIZABLE STORES</h3>
              <p className="text-[16px] text-white opacity-[0.66]">
                Effortlessly design and sell custom products without upfront
                inventory costs
              </p>
            </div>
            <div className="bg-gradient-to-b from-black via-black via-40% to-[#016FDE] py-16 px-4   text-white p-4 rounded-lg flex flex-col items-center text-center shadow-md">
              <h3 className="text-lg font-semibold">AFFILIATE PROGRAM</h3>
              <p className="text-[16px] text-white opacity-[0.66]">
                Expand your reach and earnings with built-in referral tools..
              </p>
            </div>
            <div className="bg-gradient-to-b from-black via-black via-65% to-[#016FDE] py-10   text-white p-8 rounded-lg flex flex-col items-center text-center shadow-md">
              <h3 className="text-lg font-semibold">CONNECT WITH COMMUNITY</h3>
              <p className="text-[16px] text-white opacity-[0.66]">
                Be part of the process! Participate in campaigns where creators
                share their ideas, the community votes on favourites, and
                exclusive designs come to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
