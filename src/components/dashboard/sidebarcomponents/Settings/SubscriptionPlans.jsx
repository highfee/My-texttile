import { useState, useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import PaymentPopup from "./payments/PaymentPopup";

export default function SubscriptionPlans() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const openPopup = (plan) => {
    setSelectedPlan(plan);
    setShowPopup(true);
  };

  return (
    <div className="px-2 lg:px-4 py-8">
      <div className="text-center pb-8">
        <h1 className="text-xl lg:text-2xl font-bold text-black">
          PAY FOR ONLY WHAT YOU NEED
        </h1>
        <p className="text-xs lg:text-lg opacity-[0.44]">
          A subscription plan that caters for every user's category needs:
        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 mb-8">
        <span
          className={`text-md lg:text-lg font-medium ${
            isMonthly ? "text-black" : "opacity-[0.44]"
          }`}
        >
          Monthly
        </span>
        <button
          className="w-12 h-6 bg-bluebutton rounded-full p-1 focus:outline-none"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
              isMonthly ? "translate-x-0" : "translate-x-6"
            }`}
          />
        </button>
        <span
          className={`text-md lg:text-lg font-medium ${
            !isMonthly ? "text-black" : "opacity-[0.44]"
          }`}
        >
          Annually
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7 w-full">
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
          setShowCreateAccount={setShowCreateAccount}
          openPopup={openPopup}
          tier="tier1"
        />
        <PlanCard
          title="Tier 2"
          subtitle="Emerging Creator"
          price={`$${isMonthly ? "2" : "19"}`}
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
          buttonText={`Buy this plan for $${isMonthly ? "2" : "19"}`}
          tier="tier2"
          extraText="OR"
          setShowCreateAccount={setShowCreateAccount}
          openPopup={openPopup}
        />
        <PlanCard
          title="Tier 3"
          subtitle="Pro Creator"
          price={`$${isMonthly ? "7" : "69.99"}`}
          description="Your Creative Starting Point: A solid foundation for new creators."
          heading="$1000 in total sales or 50 products sold."
          features={[
            "Everything from Emerging Creator tier.",
            "Unlimited design",
            "Ability to set promotional prices and create discount sales codes",
            "Featured on platform as a top creator in relevant categories",
          ]}
          idealFor="Enterprises"
          buttonText={`Buy this plan for $${isMonthly ? "7" : "69.99"}`}
          tier="tier3"
          extraText="OR"
          setShowCreateAccount={setShowCreateAccount}
          openPopup={openPopup}
        />
        <PlanCard
          title="Tier 4"
          subtitle="Emerging Creator"
          price={`$${isMonthly ? "15" : "150"}`}
          description="Creators who have demonstrated consistent success."
          heading="$5000 in total sales or 250 products sold."
          features={[
            "Everything from the Pro Creator tier.",
            "Print-on-demand, top selling designs are printed and stocked for fast delivery.",
            "Higher commission rates on product sales and referral earnings.",
            "Premium campaign placement on the platform",
            "Creation of own brand.",
            "Personalized marketing support from MyTextil",
          ]}
          idealFor="Entrepreneurs"
          buttonText={`Buy this plan for $${isMonthly ? "15" : "150"}`}
          tier="tier4"
          extraText="OR"
          setShowCreateAccount={setShowCreateAccount}
          openPopup={openPopup}
        />
      </div>
      <PaymentPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        plan={selectedPlan} 
        isMonthly={isMonthly}
      />
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
  heading,
  extraText,
  setShowCreateAccount,
  openPopup,
  tier,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // This effect runs only once on mount
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      // Auto-show details on desktop
      if (window.innerWidth >= 1024) {
        setShowDetails(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonBgColor = buttonText === "Active" ? "bg-black" : "bg-white";
  const buttonTextColor = buttonText === "Active" ? "text-white" : "text-black";

  return (
    <div className="rounded-lg flex flex-col items-center text-center">
      <div
        className={`rounded-lg w-full p-4 ${
          tier === "tier3" ? "bg-bluebutton" : "bg-bluebg"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col text-left">
            <p
              className={`text-[14px] font-semibold ${
                tier === "tier3" ? "text-white" : "text-black"
              }`}
            >
              {title}
            </p>
            <p
              className={`text-graycolor opacity-[0.44] text-[13px] ${
                tier === "tier3" ? "text-white" : "text-black"
              }`}
            >
              {subtitle}
            </p>
          </div>
          <h4
            className={`text-3xl font-bold ${
              tier === "tier3" ? "text-white" : "text-black"
            }`}
          >
            {price}
          </h4>
        </div>

        <div className="flex flex-col items-start w-full text-left py-6 tracking-[-1px] leading-[19.6px]">
          <p
            className={`text-[13px] opacity-[0.44] ${
              tier === "tier3" ? "text-white" : "text-black"
            }`}
          >
            {description}
          </p>
          <p
            className={`text-[14px] font-semibold ${
              tier === "tier3" ? "text-white" : "text-black"
            }`}
          >
            {heading}
          </p>
        </div>

        {extraText && (
          <p
            className={`hidden md:block text-[13px] font-semibold ${
              tier === "tier3" ? "text-white" : "text-black"
            }`}
          >
            {extraText}
          </p>
        )}
        {!isDesktop && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`text-graycolor py-2 text-xs underline ${
              tier === "tier3" ? "text-white" : "text-black"
            }`}
          >
            {showDetails ? "SEE LESS" : "SEE BENEFITS"}
          </button>
        )}

        <button
          onClick={() => {
            if (!buttonDisabled) {
              setShowCreateAccount(true);
              openPopup(title);
            }
          }}
          className={`w-full py-2 rounded font-semibold ${buttonBgColor} ${buttonTextColor}`}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
      </div>
      
      {/* Features list - conditionally rendered based on screen size and state */}
      {(isDesktop || showDetails) && (
        <ul className="text-sm text-gray-600 space-y-2 mt-4 text-left w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <GiCheckMark className="text-black mr-2" />
              {feature}
            </li>
          ))}
          <li className="text-graycolor opacity-[0.44]">
            Ideal For: {idealFor}
          </li>
        </ul>
      )}
    </div>
  );
}