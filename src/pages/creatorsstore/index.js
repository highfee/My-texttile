"use client";

import { useState } from "react";
import CreatorHeader from "@/components/creatorstore/CreatorHeader";
import Footer from "@/components/creatorstore/Footer";
import Hero from "@/components/creatorstore/Hero";
import Cart from "@/components/creatorstore/Cart";
import SupportPage from "@/components/creatorstore/SupportPage"; // Import your SupportPage component
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function StorePage() {
  const [showCart, setShowCart] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [heroState, setHeroState] = useState({
    showShop: false,
    selectedProduct: null,
  });

  const fetchData = async () => {
    const response = await httpClient.get("/shops/profile/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data["response data"];
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["shop"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const resetNavigation = () => {
    setShowCart(false);
    setShowSupport(false);
    setHeroState({
      showShop: false,
      selectedProduct: null,
    });
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
    // Reset other states when cart is shown
    if (!showCart) {
      setShowSupport(false);
      setHeroState({
        showShop: false,
        selectedProduct: null,
      });
    }
  };

  const handleSupportClick = () => {
    setShowSupport(true);
    setShowCart(false);
    setHeroState({
      showShop: false,
      selectedProduct: null,
    });
  };

  return (
    <div
      className={`${inter.className} tracking-[-1px] `}
      style={{
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <CreatorHeader
        toggleCart={toggleCart}
        onHomeClick={resetNavigation}
        data={data}
      />

      {showCart ? (
        <Cart />
      ) : showSupport ? (
        <SupportPage onBackClick={resetNavigation} />
      ) : (
        <>
          <Hero heroState={heroState} setHeroState={setHeroState} data={data} />
        </>
      )}
      {!heroState.showShop && (
        <Footer onSupportClick={handleSupportClick} data={data} />
      )}
    </div>
  );
}
