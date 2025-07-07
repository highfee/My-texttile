"use client";

import React, { useEffect } from "react";

import Sidebar from "@/components/dashboard/design/Sidebar";
import Canvas from "@/components/dashboard/design/Canvas";
import { useRouter } from "next/router";
import { useDesignStore } from "@/store/design-store";
import { useGetAllDesigns } from "@/store/apiCalls/useDesignStore";
import { usePublishDesign } from "@/store/usePublishDesign";

const Main = () => {
  const router = useRouter();
  const query = router.query;

  const { loadTemplate } = useDesignStore();
  const {
    setProductName,
    setProductType,
    setEditProductColors,
    setEditProductSize,
    setListing,
    setProductPrice,
    setVisibility,
  } = usePublishDesign();
  const {
    data: recentProjects,
    isLoading,
    error,
    refetch,
  } = useGetAllDesigns();

  //  get design data

  useEffect(() => {
    if (query.edit && query.id) {
      const product = recentProjects?.find(
        (project) => project.id === router.query.id
      );

      loadTemplate(product.design_view_data);
      setProductName(product.design_description);
      setProductType(product.product_category);
      setEditProductColors(product.color);
      setEditProductSize(product.size);
      // setListing(product.listing);
      setProductPrice(product.shop_price);
      setVisibility(product.isPublic);
    }
  }, [query]);
  return (
    <div className="bg-off-white h-screen absolute inset-0 flex shadow-md overflow-y-hidden ">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Main;
