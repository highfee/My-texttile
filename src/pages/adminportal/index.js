
import Creator from "@/components/adminportal/adminsidebar/Creator";
import Dashboard from "@/components/adminportal/adminsidebar/Dashboard";
import Member from "@/components/adminportal/adminsidebar/Member";
import AdminDashboardLayout from "@/components/adminportal/Layout/AdminDashboardLayout";
import Campaigns from "@/components/adminportal/adminsidebar/Campaigns";
import React from "react";
import ProductsDashboard from "@/components/adminportal/adminsidebar/ProductsDasboard";
import Payout from "@/components/adminportal/adminsidebar/Payout";
import Settings from "@/components/adminportal/adminsidebar/Settings";

export default function index() {
  return (
   <AdminDashboardLayout>
    <Dashboard name="Dashboard"/>
    <Creator name="Creator"/>
    <Member name="Member"/>
    <Campaigns name="Campaigns"/>
    <ProductsDashboard name="Store & Product"/>
    <Payout name="Payout"/>
    <Settings name="Settings"/>
   </AdminDashboardLayout>
  );
}