"use client";

import React from "react";
import dynamic from "next/dynamic";
import Sidebar from "./Sidebar";

const Canvas = dynamic(() => import("./Canvas"), {
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
