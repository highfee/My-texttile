import React from "react";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

const Main = () => {
  return (
    <div className="bg-off-white h-screen absolute inset-0 flex shadow-md overflow-y-hidden ">
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default Main;
