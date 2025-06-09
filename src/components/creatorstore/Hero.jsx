"use client";

import { ShoppingCart } from "lucide-react";
import Shop from "./Shop";
import ProductDetail from "./ProductDetail";
// import { products } from "@/data/adminData/creator/herosection";
import { httpClient } from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

const Hero = ({ heroState, setHeroState, data }) => {
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  const fetchData = async () => {
    const response = await httpClient.get("/designs/shop/view/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data["response data"].result;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchData,
  });

  if (heroState.showShop) return <Shop />;
  if (heroState.selectedProduct)
    return <ProductDetail product={heroState.selectedProduct} />;

  return (
    <div className="w-full leading-[100%] tracking-[-0.02em]">
      <div className="relative w-full h-[400px] isolate">
        <img
          src={data?.shop_banner}
          alt="Hero"
          className="w-full h-full object-cover isolate relative"
        />
        <div className="absolute bg-black/50 inset-0 z-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center px-4 z-30">
          <h1 className="text-white text-3xl font-semibold mb-2">
            {data?.hero_title}
          </h1>
          <p className="text-gray-300 py-4">{data?.hero_text}</p>
          <button
            onClick={() =>
              setHeroState({ showShop: true, selectedProduct: null })
            }
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            {/* {data?.hero_button_text} */}
            Shop Now
          </button>
        </div>
      </div>

      {/* products */}
      <div className="py-12 px-8 md:px-32 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products?.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="cursor-pointer group relative">
              <div
                onClick={() =>
                  setHeroState({ showShop: false, selectedProduct: product })
                }
                className="w-full bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div
                  onClick={() =>
                    setHeroState({ showShop: false, selectedProduct: product })
                  }
                >
                  <h3 className="text-sm font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-gray-600 hover:text-black transition"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          ))}

        {products?.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
