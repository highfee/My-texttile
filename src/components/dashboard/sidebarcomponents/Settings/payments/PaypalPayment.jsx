const PaypalPayment = ({ currentPlan }) => {
    return (
      <div className="w-full">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-2 rounded">
                {/* PayPal logo placeholder */}
                <div className="w-16 h-10 bg-blue-200"></div>
              </div>
              <div>
                <p className="text-sm font-medium">PayPal</p>
                <p className="text-xs text-gray-500">Safe and secure payments</p>
              </div>
            </div>
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
  
  export default PaypalPayment;