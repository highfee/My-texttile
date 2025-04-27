import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaArrowLeftLong } from "react-icons/fa6";
import Welcome from "./Welcome";

export default function Pricingplans({ onBack }) {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);

  if (showCreateAccount) {
    return <Welcome onBack={() => setShowCreateAccount(false)} />;
  }

  return (
    <div
      className="flex flex-col items-center p-4 tracking-[-1px] leading-[19.6px] w-full font sm:w-[600px] md:w-[700px] lg:w-[850px]  h-[400px] md:h-[450px] lg:h-[572px] mx-auto overflow-y-auto
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left - Back Arrow */}
        {/* <FaArrowLeftLong className="text-black cursor-pointer" onClick={onBack} /> */}

        {/* Center - Title & Subtitle */}
        <div className="flex flex-col items-center">
          <h2 className="text-[16px] lg:text-3xl font-bold">
            Enjoy the best of Owneet
          </h2>
          <p className="text-graycolor opacity-[0.44] text-[10px] lg:text-sm text-center">
            Tier 2 offers you the best of our platform and fuels your dreams
          </p>
        </div>

        {/* Right - Skip Button */}
        <button className="text-[14px] cursor-pointer text-graycolor opacity-[0.44] pr-2">
          Skip
        </button>
      </div>

      {/* Monthly/Annual Toggle */}
      <div className="flex items-center space-x-2 py-3">
        <span className="text-black text-[14px] font-bold">Monthly</span>
        <button
          className="w-10 h-4 bg-bluebutton rounded-full relative focus:outline-none"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <span
            className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transform transition-transform ${
              isMonthly ? "translate-x-1" : "-translate-x-4"
            }`}
          ></span>
        </button>
        <span className="text-black text-[14px] font-bold">Annually</span>
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-7 w-full max-w-5xl">
        {/* Free Plan */}
        <PlanCard
          title="Free plan"
          subtitle="Starter Creator"
          price="$0"
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="Basic Design Tools"
          features={[
            "Access to product creation tools (print-on-demand)",
            "Ability to list products in the store",
            "Limited designs amount peaked at Starter creator tier.",
          ]}
          idealFor="hobbyists"
          buttonText="Active"
          buttonDisabled
          setShowCreateAccount={setShowCreateAccount} // Pass the function
        />

        {/* Tier 2 Plan */}
        <PlanCard
          title="Tier 2"
          subtitle="Emerging Creator"
          price={`$${isMonthly ? "19" : "200"}`}
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="Sell 10 products, or $200 in total revenue"
          features={[
            "Everything from the Starter creator tier.",
            "25 designs max",
            "Access to Affiliate Program",
            "Access to advanced design features",
            "Enhanced analytics dashboard",
            "Early access to new platform features",
          ]}
          idealFor="Entrepreneurs"
          buttonText={`Buy this plan for $${isMonthly ? "19" : "200"}`}
          tier="tier2"
          extraText="OR"
          setShowCreateAccount={setShowCreateAccount} // Pass the function
        />

        {/* Tier 3 Plan */}
        <PlanCard
          title="Tier 3"
          subtitle="Pro Creator"
          price={`$${isMonthly ? "69.99" : "899"}`}
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="$1000 in total sales or 50 products sold."
          features={[
            "Everything from Emerging Creator tier.",
            "Unlimited design",
            "Ability to set promotional prices and create discount sales codes",
            "Featured on platform as a top creator in relevant categories",
          ]}
          idealFor="Enterprises"
          buttonText={`Buy this plan for $${isMonthly ? "69.99" : "899"}`}
          tier="tier3"
          extraText="OR"
          setShowCreateAccount={setShowCreateAccount} // Pass the function
        />
      </div>
    </div>
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  description,
  features,
  idealFor,
  buttonText,
  buttonDisabled,
  tier,
  heading,
  extraText,
  setShowCreateAccount, // Add this prop
}) {
  return (
    <div className="rounded-lg flex flex-col items-center text-center">
      <div
        className={`rounded-lg w-full p-4 ${
          tier === "tier2" ? "bg-bluebutton" : "bg-bluebg"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col text-left">
            <p
              className={`text-[14px] font-semibold ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {title}
            </p>
            <p
              className={`text-graycolor opacity-[0.44] text-[13px] ${
                tier === "tier2" ? "text-white" : "text-black"
              }`}
            >
              {subtitle}
            </p>
          </div>
          <h4
            className={`text-3xl font-bold ${
              tier === "tier2" ? "text-white" : "text-black"
            }`}
          >
            {price}
          </h4>
        </div>

        <div className="flex flex-col items-start w-full text-left py-6 tracking-[-1px] leading-[19.6px]">
          <p
            className={`text-[13px] opacity-[0.44] ${
              tier === "tier2" ? "text-white" : "text-black"
            }`}
          >
            {description}
          </p>
          <p
            className={`text-[14px] font-semibold ${
              tier === "tier2" ? "text-white" : "text-black"
            }`}
          >
            {heading}
          </p>
        </div>

        {extraText && (
          <p
            className={`text-[13px] font-semibold  ${
              tier === "tier2" ? "text-white" : "text-black"
            }`}
          >
            {extraText}
          </p>
        )}

        {/* Button with Conditional Styling */}
        <button
          onClick={() => setShowCreateAccount(true)} // Call setShowCreateAccount on click
          className={`w-full py-2 rounded font-semibold 
            ${
              tier === "tier2" ? "bg-white text-black" : "bg-white text-black"
            }`}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
      </div>
      <ul className="text-sm text-gray-600 space-y-2 mt-4 text-left w-full">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <GiCheckMark className="text-black mr-2" />
            {feature}
          </li>
        ))}
        <li className="text-graycolor opacity-[0.44]">Ideal For: {idealFor}</li>
      </ul>
    </div>
  );
}
