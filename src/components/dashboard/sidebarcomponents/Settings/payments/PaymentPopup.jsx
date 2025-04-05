import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import CardPayment from "./CardPayment";
import CryptoPayment from "./CryptoPayment";
import PaypalPayment from "./PaypalPayment";
import { GiCheckMark } from "react-icons/gi";
import Successful from "./Successful";

const PaymentPopup = ({ isOpen, onClose, plan, isMonthly }) => {
  if (!isOpen) return null;
  const [activeMethod, setActiveMethod] = useState("card");
  const [btcRate, setBtcRate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const fetchBtcRate = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await response.json();
        setBtcRate(1 / data.bitcoin.usd); // Convert USD to BTC
      } catch (error) {
        console.error("Error fetching BTC rate:", error);
        setBtcRate(0.000025); // Fallback rate
      }
    };

    fetchBtcRate();
  }, []);

  const convertToBTC = (price) => {
    if (!btcRate) return "Loading...";
    const amount = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    return `${(amount * btcRate).toFixed(6)} BTC`;
  };
  const planDetails = {
    "Tier 2": {
      title: "Tier 2",
      subtitle: "Emerging Creator",
      price: isMonthly ? "$2" : "$19",
      description:
        "Your Creative Starting Point: A solid foundation for new creators.",
      features: [
        "Everything from the Starter creator tier",
        "25 designs max",
        "Access to Affiliate Program",
        "Access to advanced design features",
      ],
      monthlyPrice: "$2",
      annualPrice: "$19",
      tier: "tier2",
      salesTarget: "Sell 10 products, or $200 in total revenue",
    },
    "Tier 3": {
      title: "Tier 3",
      subtitle: "Pro Creator",
      price: isMonthly ? "$7" : "$69.99",
      description:
        "Your Creative Sharing Point: A solid foundation for new creators.",
      features: [
        "Everything from Emerging Creator tier",
        "Unlimited design",
        "Ability to set promotional prices and create discount sales codes",
        "Featured on platform as a top creator in relevant categories",
      ],
      monthlyPrice: "$7",
      annualPrice: "$69.99",
      tier: "tier3",
      salesTarget: "$1000 in total sales or 50 products sold",
    },
    "Tier 4": {
      title: "Tier 4",
      subtitle: "Elite Creator",
      price: isMonthly ? "$15" : "$150",
      description: "Creators who have demonstrated consistent success.",
      features: [
        "Everything from the Pro Creator tier",
        "Higher commission rates on product sales",
        "Premium campaign placement",
        "Creation of own brand",
      ],
      monthlyPrice: "$15",
      annualPrice: "$150",
      tier: "tier4",
      salesTarget: "$5000 in total sales or 250 products sold",
    },
  };

  const currentPlan = planDetails[plan] || planDetails["Tier 3"];
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector(".popup-container");
      if (popup && !popup.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handlePayment = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 5000);
  };
  const renderPaymentMethod = () => {
    switch (activeMethod) {
      case "card":
        return <CardPayment currentPlan={currentPlan} />;
      case "crypto":
        return <CryptoPayment currentPlan={currentPlan} />;
      case "paypal":
        return <PaypalPayment currentPlan={currentPlan} />;
      default:
        return <CardPayment currentPlan={currentPlan} />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Successful />
        </div>
      )}
      <div className="popup-container bg-white rounded-lg shadow-lg w-[90%] max-w-4xl flex flex-col lg:flex-row">
        {/* Left Column - Payment Form */}
        <div className="w-full lg:w-2/3 p-2 lg:p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Checkout</h2>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Complete your subscription payment quickly and securely. Choose your
            preferred payment methods.
          </p>

          <div className="flex lg:space-x-3 space-x-1 text-[10px] lg:text-sm lg:font-medium mb-6">
            <button
              className={`w-full py-2 border rounded-lg text-left px-1 lg:px-3 hover:bg-gray-50 flex items-center transition-colors ${
                activeMethod === "card"
                  ? "bg-blue-50 border-bluebutton text-bluebutton"
                  : "border-gray-200"
              }`}
              onClick={() => setActiveMethod("card")}
            >
              <img
                src="/dashboard/payment/cardpayment.svg"
                className="lg:pr-2 w-5 h-5"
                alt="Card"
              />
              Card Payment
            </button>
            <button
              className={`w-full py-2 border rounded-lg text-left px-3 hover:bg-gray-50 flex items-center transition-colors ${
                activeMethod === "crypto"
                  ? "bg-blue-50 border-bluebutton text-bluebutton"
                  : "border-gray-200"
              }`}
              onClick={() => setActiveMethod("crypto")}
            >
              <img
                src="/dashboard/payment/crypto.svg"
                className="lg:pr-2 w-5 h-5"
                alt="Crypto"
              />
              Pay with Crypto
            </button>
            <button
              className={`w-full py-2 border rounded-lg text-left px-3 hover:bg-gray-50 flex items-center transition-colors ${
                activeMethod === "paypal"
                  ? "bg-blue-50 border-bluebutton text-bluebutton"
                  : "border-gray-200"
              }`}
              onClick={() => setActiveMethod("paypal")}
            >
              <img
                src="/dashboard/payment/paypal.svg"
                className="lg:pr-2 w-5 h-5"
                alt="PayPal"
              />
              Paypal
            </button>
          </div>

          {renderPaymentMethod()}
          <button
            onClick={handlePayment}
            className="w-full py-2 bg-bluebutton text-white rounded font-bold hover:bg-bluebutton transition duration-200 mt-4">
            Make payment
          </button>
        </div>

        <div className="hidden  items-center justify-center py-10 px-3 lg:flex flex-col">
          <div
            className={`w-5/6 ${
              currentPlan.tier === "tier3"
                ? "bg-bluebutton text-white"
                : "bg-bluebg"
            } rounded-lg p-4 `}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{currentPlan.title}</h3>
                <p className="text-sm opacity-80">{currentPlan.subtitle}</p>
              </div>
              <span className="text-2xl font-bold">
                {activeMethod === "crypto"
                  ? convertToBTC(currentPlan.price)
                  : currentPlan.price}
              </span>
            </div>

            <p className="text-sm opacity-80 mb-4">{currentPlan.description}</p>
            <p className="text-sm font-medium">{currentPlan.salesTarget}</p>

            <button
              className={`w-full mt-6 py-2 rounded-md font-semibold ${
                currentPlan.tier === "tier3"
                  ? "bg-white text-bluebutton"
                  : "bg-bluebutton text-white"
              }`}
            >
              Buy this plan for{" "}
              {activeMethod === "crypto"
                ? convertToBTC(currentPlan.price)
                : currentPlan.price}
            </button>
          </div>

          <div className="w-5/6  items-center p-2">
            <ul className="space-y-2 ">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-x-2 ">
                  <GiCheckMark />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-4 text-center">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Secure Payment</span> - All
              transactions are encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
