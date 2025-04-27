import { useState } from "react";
import { FiSmartphone, FiMonitor, FiEdit2, FiX } from "react-icons/fi";
import NavigationBarEditor from "./NavigationBarEditor";
import HeroBar from "./HeroBar";
import FooterBar from "./FooterBar";
import Productspopup from "./Productspopup";

export default function StoreEditor({ onBack, initialView = "desktop" }) {
  const [activeView, setActiveView] = useState(initialView);
  const [editingSection, setEditingSection] = useState(null);
  const [showProductsPopup, setShowProductsPopup] = useState(false);
  const [productsData, setProductsData] = useState([]); // State to hold product data
  const [navBarSettings, setNavBarSettings] = useState({
    logo: null,
    siteTitle: "",
    bgColor: "#979797",
    menuItemColor: "#979797"
  });
  const [heroBannerSettings, setHeroBannerSettings] = useState({
    title: "",
    subtitle: "",
    image: null,
    ctaText: "",
    ctaLink: ""
  });
  const [footerSettings, setFooterSettings] = useState({
    copyrightText: "",
    links: [],
    socialIcons: []
  });

  const handleEditSection = (section) => {
    if (section === "Products") {
      setShowProductsPopup(true);
    } else {
      setEditingSection(editingSection === section ? null : section);
    }
  };

  const handleSaveNavBar = (settings) => {
    setNavBarSettings(settings);
    setEditingSection(null);
  };

  const handleSaveHeroBanner = (settings) => {
    setHeroBannerSettings(settings);
    setEditingSection(null);
  };

  const handleSaveFooter = (settings) => {
    setFooterSettings(settings);
    setEditingSection(null);
  };

  const handleSaveProducts = (products) => {
    setProductsData(products);
    setShowProductsPopup(false);
    console.log("Saved Products:", products); // You can handle the saved products here
  };

  const sections = [
    { id: "Navigation Bar", name: "Navigation Bar" },
    { id: "Hero Banner", name: "Hero Banner" },
    { id: "Products", name: "Products" },
    { id: "Footer", name: "Footer" },
  ];

  return (
    <div className="hidden lg:flex flex-col h-screen">
      {showProductsPopup && (
        <Productspopup
          onSave={handleSaveProducts}
          onCancel={() => setShowProductsPopup(false)}
          products={productsData} 
        />
      )}

      <div className="w-72 absolute top-0 z-40 p-4">
        <button
          onClick={onBack}
          className="flex items-center border border-graycolor rounded-lg p-2 opacity-[0.44] hover:opacity-100"
        >
          <FiEdit2 className="mr-2" />
          Quit Editor
        </button>

        <div className="space-y-6 py-6">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <div
                className={`flex items-center justify-between p-2 rounded ${
                  editingSection === section.id
                    ? " text-bluebutton"
                    : ""
                }`}
                
              >
                <span>{section.name}</span>
                <div className="hover:bg-gray-100 rounded-full p-1 cursor-pointer">

                <FiEdit2 className="text-md " onClick={() => handleEditSection(section.id)} />
                </div>
              </div>
              {editingSection === section.id && section.id === "Navigation Bar" && (
                <NavigationBarEditor
                  onSave={handleSaveNavBar}
                  onCancel={() => setEditingSection(null)}
                  initialSettings={navBarSettings}
                />
              )}
              {editingSection === section.id && section.id === "Hero Banner" && (
                <HeroBar
                  onSave={handleSaveHeroBanner}
                  onCancel={() => setEditingSection(null)}
                  initialSettings={heroBannerSettings}
                />
              )}
              {editingSection === section.id && section.id === "Footer" && (
                <FooterBar
                  onSave={handleSaveFooter}
                  onCancel={() => setEditingSection(null)}
                  initialSettings={footerSettings}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-20">
        <div className="flex justify-center space-x-4 p-4">
          <button
            className={`flex items-center ${
              activeView === "desktop" ? "text-graycolor" : "opacity-[0.44]"
            }`}
            onClick={() => setActiveView("desktop")}
          >
            <FiMonitor />
          </button>
          <button
            className={`flex items-center ${
              activeView === "mobile" ? "text-graycolor" : "opacity-[0.44]"
            }`}
            onClick={() => setActiveView("mobile")}
          >
            <FiSmartphone />
          </button>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="relative">
            {activeView === "desktop" ? (
              <img
                src="/dashboard/store/desktop.png"
                alt="Desktop Preview"
                className="max-w-full h-auto border rounded-lg shadow-sm"
              />
            ) : (
              <img
                src="/dashboard/store/mobile.png"
                alt="Mobile Preview"
                className="max-w-xs h-auto border rounded-lg shadow-sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}