"use client";

import React from "react";

import Sidebar from "@/components/dashboard/design/Sidebar";
import Canvas from "@/components/dashboard/design/Canvas";

const Main = () => {
  return (
    <div className="bg-off-white h-screen absolute inset-0 flex shadow-md overflow-y-hidden ">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Main;
