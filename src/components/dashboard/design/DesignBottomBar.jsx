// components/dashboard/Layout/BottomBar.jsx
import { Home, ShoppingCart, Plus, X, List, Wallet } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

const DesignBottomBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleCenter = () => setIsOpen(!isOpen);
  const navigateTo = (path) => router.push(`/dashboard/${path}`);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40 p-2"></div>
    </>
  );
};

export default DesignBottomBar;
