const OrderDetails = ({ order, onBack }) => {
    const productOrders = [
      { customer: "Liam Carter", product: order.name, amount: "$150", qty: 2, status: "Delivered" },
      { customer: "Sophia Turner", product: order.name, amount: "$400", qty: 5, status: "Pending" },
      { customer: "Mason Brooks", product: order.name, amount: "$2,500", qty: 2, status: "Processing" },
      { customer: "Emma Reed", product: order.name, amount: "$250", qty: 1, status: "Processing" },
    ];
  
    const getStatusColor = (status) => {
      if (status === "Delivered") return "text-green-500";
      if (status === "Pending") return "text-[#FF5789]";
      if (status === "Processing") return "text-[#FD9D49]";
      return "text-gray-500";
    };
  
    return (
      <div className="overflow-x-auto ">
        <button onClick={onBack} className="text-gray-500 hover:underline mb-4">
          Back
        </button>
  
        <div className="border rounded-md p-4 min-w-[800px]">
          <div className="grid grid-cols-6 text-graycolor pb-2 text-center border-b">
            <p>Thumbnail</p>
            <p>Name/Category</p>
            <p>Orders</p>
            <p>Price</p>
            <p>Recent Order</p>
            <p>Status</p>
          </div>
  
          <div className="grid grid-cols-6 items-center border-b gap-x-6 py-3 text-center">
            <div>
              <img
                src={order.thumbnail}
                alt={order.name}
                className="w-full h-24 object-cover rounded-md"
              />
            </div>
  
            <div className="space-y-1">
              <p className="font-semibold">{order.name}</p>
              <p className="text-gray-500 text-sm">{order.category}</p>
            </div>
  
            <p>{order.orders}</p>
  
            <p className="font-bold">{order.price}</p>
  
            <p className="text-[#FF5789]">{order.recentOrder}</p>
  
            <p className={order.status === "Processing" ? "text-[#FD9D49]" : "text-[#FF5789]"}>
              {order.status}
            </p>
          </div>
        </div>
  
        {/* Orders List */}
        <div className=" space-y-4  min-w-[800px] py-10">
        <div className="border rounded-lg p-4">
        <div className="grid grid-cols-5 text-graycolor pb-2 text-center border-b ">
            <p>Customer</p>
            <p>Product</p>
            <p>Amount</p>
            <p>Qty</p>
            <p>Status</p>
          </div>
  
          {productOrders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center text-center text-black border-b border-[#DCE7F2] py-2"
            >
              <div className="col-span-1 flex flex-row text-center items-center space-x-2">
                <img src="/dashboard/purchaseicon.png" alt="Customer Icon" className="w-6 h-6" />
                <p className="text-sm">{order.customer}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm">{order.product}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm">{order.amount}</p>
              </div>
              <div className="col-span-1">
                <p className="text-sm">{order.qty}</p>
              </div>
              <div className="col-span-1">
                <p className={`text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
         
        </div>
      </div>
    );
  };
  
  export default OrderDetails;
  