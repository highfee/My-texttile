import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
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