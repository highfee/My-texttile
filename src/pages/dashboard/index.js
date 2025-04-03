import Dashboardlayout from "@/components/dashboard/Layout/Dashboardlayout";
import Home from "@/components/dashboard/Layout/Home";
import Analytics from "@/components/dashboard/sidebarcomponents/Analytics";
import BrandComponent from "@/components/dashboard/sidebarcomponents/BrandComponent";
import HelpCenter from "@/components/dashboard/sidebarcomponents/HelpCenter/HelpCenter";
import Listing from "@/components/dashboard/sidebarcomponents/Listing/Listing";
import Payout from "@/components/dashboard/sidebarcomponents/Payout";
import Purchases from "@/components/dashboard/sidebarcomponents/Purchases";
import Settings from "@/components/dashboard/sidebarcomponents/Settings/Settings";
import Store from "@/components/dashboard/sidebarcomponents/Store";
import React from "react";

export default function index() {
  return (
   <Dashboardlayout>
      <Home name="Home"/>
      <Purchases name="Purchase"/>
      <Analytics name="Analytics"/>
      <BrandComponent name="Brand"/>
      <Payout name="Payout"/>
      <HelpCenter name="HelpCenter"/>
      <Listing name="Listing"/>
      <Settings name="Settings"/>
      <Store name="Store"/>
    </Dashboardlayout>
  );
}