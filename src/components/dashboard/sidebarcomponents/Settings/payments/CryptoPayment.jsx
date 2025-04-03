import { useState, useEffect } from "react";

const CryptoPayment = ({ currentPlan }) => {
  const [btcAmount, setBtcAmount] = useState("0.002");
  const [isLoading, setIsLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const fetchBtcRate = async () => {
      try {
        setIsLoading(true);
        const usdAmount = parseFloat(
          currentPlan.price.replace(/[^0-9.-]+/g, "")
        );
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        const data = await response.json();
        const btcRate = 1 / data.bitcoin.usd;
        setBtcAmount((usdAmount * btcRate).toFixed(6));
      } catch (error) {
        console.error("Error fetching BTC rate:", error);
        setBtcAmount("0.002");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBtcRate();
  }, [currentPlan.price]);

  return (
    <div className="w-full flex flex-col" style={{ maxHeight: "60vh" }}>
      {/* Compact QR Section */}
      <div className=" text-center">
        <p className="text-sm text-graycolor ">Scan to pay</p>
        <div className=" h-32 w-32 mx-auto  flex items-center justify-center rounded-lg">
        <img src="/dashboard/payment/QR-Code.png"/>
          
        </div>
        <div className="flex items-center justify-center space-x-1 max-w-full px-4 py-2">
          <p className="text-xs font-mono bg-gray-100 p-1 rounded truncate">
            0x466422ca76a0b9c502c7fbc6999156...
          </p>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                "0x466422ca76a0b9c502c7fbc6999156..."
              )
            }
            className="text-blue-600 text-xs hover:text-blue-800 whitespace-nowrap"
          >
            Copy
          </button>
        </div>
      </div>

      <button
        onClick={() => setWalletConnected(!walletConnected)}
        className={`mx-auto block w-fit px-4 py-2 text-sm rounded ${
          walletConnected
            ? "bg-green-600 text-white"
            : "bg-[#016FDE1A] text-graycolor"
        }`}
      >
        {walletConnected ? "✓ Wallet Connected" : "Connect Wallet"}
      </button>

      {/* Compact Order Summary */}
      <div className=" pt-3 mb-4">
        <h3 className="font-bold text-sm mb-2">Order</h3>
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-gray-600">
            {currentPlan.title} - {currentPlan.subtitle}
          </span>
          <span className="font-medium">
            {isLoading ? "..." : `${btcAmount} BTC`}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Network fees</span>
          <span className="font-medium">~0.0001 BTC</span>
        </div>
      </div>

      {/* Payment Button */}

      {isLoading && (
        <p className="text-xs text-gray-500 mt-1 text-center">
          Getting exchange rate...
        </p>
      )}
    </div>
  );
};

export default CryptoPayment;
