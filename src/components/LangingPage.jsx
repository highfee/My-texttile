import React from "react";
import Discover from "@/components/landingpage/Discover";
import Features from "@/components/landingpage/Features";
import Footer from "@/components/landingpage/Footer";
import Hero from "@/components/landingpage/Hero";
import Movement from "@/components/landingpage/Movement";
import Navbar from "@/components/landingpage/Navbar";
import Textilambassador from "@/components/landingpage/Textileambassador";
export default function LangingPage() {
  return (
    <div className="flex justify-center items-center w-full overflow-x-hidden  ">
      <div className="w-screen max-w-[1680px] ">
        <Navbar />
        <Hero className="bg-bgcustom" />
        <Movement />
        <Textilambassador />
        <Features />
        <Discover />
        <Footer />
      </div>
    </div>
  );
}
