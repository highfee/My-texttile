"use client";

import React from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/dashboard/design/Sidebar";

const Canvas = dynamic(() => import("@/components/dashboard/design/Canvas"), {
  ssr: false,
});

const Main = () => {
  return (
    <div className="bg-off-white h-screen absolute inset-0 flex shadow-md overflow-y-hidden ">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Main;
