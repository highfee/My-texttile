"use client"; // Add this at the top since we'll be using hooks
import React, { useRef } from "react";
import Discover from "@/components/landingpage/Discover";
import Features from "@/components/landingpage/Features";
import Footer from "@/components/landingpage/Footer";
import Hero from "@/components/landingpage/Hero";
import Movement from "@/components/landingpage/Movement";
import Navbar from "@/components/landingpage/Navbar";
import Textilambassador from "@/components/landingpage/Textileambassador";

export default function LandingPage() {
  // Create refs for each section you want to scroll to
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const creatorsRef = useRef(null);

  return (
    <div className="flex justify-center items-center w-full overflow-x-hidden">
      <div className="w-screen max-w-[1680px]">
        {/* Pass the refs to Navbar */}
        <Navbar 
          homeRef={homeRef} 
          featuresRef={featuresRef} 
          creatorsRef={creatorsRef} 
        />
        
        {/* Assign refs to the corresponding sections */}
        <div ref={homeRef}>
          <Hero className="bg-bgcustom" />
        </div>
        
        <Movement />
        <Textilambassador />
        
        <div ref={featuresRef}>
          <Features />
        </div>
        
        <div ref={creatorsRef}>
          <Discover />
        </div>
        
        <Footer />
      </div>
    </div>
  );
}