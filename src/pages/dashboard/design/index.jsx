"use client";

import React, { useEffect } from "react";

import Sidebar from "@/components/dashboard/design/Sidebar";
import Canvas from "@/components/dashboard/design/Canvas";
import useDesignStore from "@/store/DesignStore";

const Main = () => {
  // useEffect(() => {
  //   useDesignStore.persist.rehydrate();
  // }, []);
  return (
    <div className="bg-off-white h-screen absolute inset-0 flex shadow-md overflow-y-hidden ">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Main;
