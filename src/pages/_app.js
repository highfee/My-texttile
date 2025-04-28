// pages/_app.js
import "@/styles/globals.css";
import AdminDashboardLayout from "@/components/adminportal/Layout/AdminDashboardLayout";
import DashboardLayout from "@/components/dashboard/Layout/Dashboardlayout";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "@/lib/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps, router }) {
  // Use the appropriate layout based on route
  const getLayout = router.pathname.startsWith("/adminportal")
    ? (page) => <AdminDashboardLayout>{page}</AdminDashboardLayout>
    : router.pathname.startsWith("/dashboard")
    ? (page) => <DashboardLayout>{page}</DashboardLayout>
    : (page) => page;

  return getLayout(
    <QueryClientProvider client={getQueryClient()}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
