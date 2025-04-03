const CardPayment = ({ currentPlan }) => {
    return (
      <div className="w-full">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Credit card number</h3>
          <input
            type="text"
            placeholder="XXXX - XXXX - XXXX - XXXX"
            className="w-full p-3 border rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="19"
            onInput={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              const formatted = value.replace(/(\d{4})(?=\d)/g, "$1-");
              e.target.value = formatted.slice(0, 19);
            }}
          />
        </div>
  
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <h3 className="font-medium mb-2">Exp. date</h3>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-3 border rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="5"
              onInput={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                let formatted = value;
                if (value.length > 2) {
                  formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                }
                e.target.value = formatted.slice(0, 5);
              }}
            />
          </div>
          <div className="w-1/2">
            <h3 className="font-medium mb-2">CVV</h3>
            <input
              type="password"
              placeholder="***"
              className="w-full p-3 border rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="4"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />
          </div>
        </div>
  
        <div className="border-t pt-4 mb-6">
          <h3 className="font-bold mb-3">Order summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">
              {currentPlan.title} - {currentPlan.subtitle}
            </span>
            <span className="font-medium">{currentPlan.annualPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax/fees</span>
            <span className="font-medium">$0.00</span>
          </div>
        </div>
  
        
      </div>
    );
  };
  
  export default CardPayment;