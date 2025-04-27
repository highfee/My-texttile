// pages/_app.js
import '@/styles/globals.css';
import AdminDashboardLayout from '@/components/adminportal/Layout/AdminDashboardLayout';
import DashboardLayout from '@/components/dashboard/Layout/Dashboardlayout';

export default function App({ Component, pageProps, router }) {
  // Use the appropriate layout based on route
  const getLayout = router.pathname.startsWith('/adminportal') 
    ? (page) => <AdminDashboardLayout>{page}</AdminDashboardLayout>
    : router.pathname.startsWith('/dashboard')
    ? (page) =>  <DashboardLayout>{page}</DashboardLayout>
    : (page) => page;

  return getLayout(<Component {...pageProps} />);
}

// import '@/styles/globals.css'
// import AdminDashboardLayout from '@/components/adminportal/Layout/AdminDashboardLayout'

// export default function App({ Component, pageProps }) {
//   // Use the layout defined at the page level, if available
//   const getLayout = Component.getLayout || ((page) => (
//     <AdminDashboardLayout>{page}</AdminDashboardLayout>
//   ))

//   return getLayout(<Component {...pageProps} />)
// }