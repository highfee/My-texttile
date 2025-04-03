import { useState } from "react";
import OrderDetails from "./OrderDetails";

const Ordered = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const products = [
    {
      id: 1,
      thumbnail: "/dashboard/img2.png",
      name: "Unisex Classic T-shirt",
      category: "T-shirt",
      orders: "6 Pcs 2 Customers",
      price: "$250.99",
      recentOrder: "In 7 days, 18th Dec 2024",
      status: "Processing",
    },
    {
      id: 2,
      thumbnail: "/dashboard/img1.png",
      name: "Men T-SHIRT collection",
      category: "T-shirt",
      orders: "2 Pcs 1 Customer",
      price: "$89.99",
      recentOrder: "In 2 weeks, 19th Dec 2024",
      status: "Pending",
    },
    {
      id: 3,
      thumbnail: "/dashboard/img6.png",
      name: "Black Print T-SHIRT collection",
      category: "T-shirt",
      orders: "6 Pcs 2 Customers",
      price: "$250.99",
      recentOrder: "In 7 days, 19th Dec 2024",
      status: "Pending",
    },
    {
      id: 4,
      thumbnail: "/dashboard/img5.png",
      name: "Black Print T-SHIRT collection",
      category: "T-shirt",
      orders: "4 Pcs 2 Customers",
      price: "$105.99",
      recentOrder: "In 7 days, 19th Dec 2024",
      status: "Pending",
    },
  ];

  return (
    <div className="">
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 text-graycolor pb-2 text-center border-b">
              <p>Thumbnail</p>
              <p>Name/Category</p>
              <p>Orders</p>
              <p>Price</p>
              <p>Recent Order</p>
              <p>Status</p>
            </div>

            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedOrder(product)}
                className="grid grid-cols-6 items-center border-b gap-x-6 py-3 text-center cursor-pointer"
              >
                <div>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>

                <p>{product.orders}</p>

                <p className="font-bold">{product.price}</p>

                <p className="text-[#FF5789]">{product.recentOrder}</p>

                <p className={product.status === "Processing" ? "text-[#FD9D49]" : "text-[#FF5789]"}>
                  {product.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordered;
