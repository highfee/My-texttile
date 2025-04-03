const Successful = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl lg:px-6 text-center flex flex-col max-h-[90vh] w-full max-w-md mx-4 overflow-y-auto">
          <div className="flex-1 p-6 s">
            <h1 className="text-2xl font-bold mb-4">PAYMENT SUCCESSFUL</h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Optimize your product for visibility, sharing, and sales. Completing them ensures
              your product is well-presented, easy to find, and ready to attract buyers.
            </p>
            <div className="flex justify-center py-2 md:py-4">
              <img 
                src="/landingpage/Clippathgroup.png"  
                alt="Success" 
                className="w-20 h-20 md:w-24 md:h-24 mx-auto"
              />
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img 
              src="/dashboard/payment/party.svg" 
              alt="Celebration" 
              className="w-40 md:w-72 h-auto object-contain"
            />
          </div>
         
        </div>
      </div>
    );
  };
  
  export default Successful;