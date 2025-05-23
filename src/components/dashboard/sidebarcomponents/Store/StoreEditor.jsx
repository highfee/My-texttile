import { useState } from "react";
import { FiSmartphone, FiMonitor, FiEdit2, FiX } from "react-icons/fi";
import NavigationBarEditor from "./NavigationBarEditor";
import HeroBar from "./HeroBar";
import FooterBar from "./FooterBar";
import Productspopup from "./Productspopup";
import Desktop from "@/components/creatorstore/template/Desktop";
import Mobile from "@/components/creatorstore/template/Mobile";
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/lib/httpClient";
import { useCreatorStore } from "@/store/useCreatorShopFront";
import { authService } from "@/lib/authService";

export default function StoreEditor({ onBack, initialView = "desktop" }) {
  // const { getSession } = authService;

  // const session = getSession();
  // console.log(session);
  const [activeView, setActiveView] = useState(initialView);
  const [editingSection, setEditingSection] = useState(null);
  const [showProductsPopup, setShowProductsPopup] = useState(false);
  const [productsData, setProductsData] = useState([]); // State to hold product data
  const [navBarSettings, setNavBarSettings] = useState({
    logo: null,
    siteTitle: "",
    bgColor: "#979797",
    menuItemColor: "#979797",
  });
  const [heroBannerSettings, setHeroBannerSettings] = useState({
    title: "",
    subtitle: "",
    image: null,
    ctaText: "",
    ctaLink: "",
  });
  const [footerSettings, setFooterSettings] = useState({
    copyrightText: "",
    links: [],
    socialIcons: [],
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

  const {
    storeName,
    storeLogoFile,
    navigationBackgroudColor,
    navigationForegroudColor,
    heroBannerTitle,
    heroBannerSubtitle,
    heroBannerImage,
    heroBannerCtaText,
    heroBannerCtaLink,
    footerCopyrightText,
    footerSocialIcons,
    footerBackgroundColor,
    footerForegroundColor,
    products,
    heroBannerImageFile,
  } = useCreatorStore();

  const storeMutation = useMutation({
    mutationFn: async (data) => {
      const response = await httpClient.post("/shops/users/create/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/creatorstore");
      if (data["response status"] === "success") {
        router.push("/creatorstore");
      } else {
        setError(data["response description"] || "Error creating store");
      }
    },
    onError: (error) => {
      setError(error.message || "Error creating store");
      console.log(error);
    },
  });

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("shop_name", storeName || "test");
    formData.append("shop_about", "Testing");
    formData.append("shop_logo", storeLogoFile);
    formData.append("shop_banner", heroBannerImageFile);
    formData.append("shop_crypto_wallet_address", "test");
    formData.append("shop_bank_name", "test");
    formData.append("shop_bank_account_number", "test");
    formData.append("shop_bank_account_name", "test");
    formData.append("shop_bank_swift_code", "test");
    formData.append("background_image", heroBannerImageFile);
    formData.append("user_bio", "test");
    formData.append("background_colour", navigationBackgroudColor);
    formData.append("text_colour", navigationForegroudColor);
    formData.append("hero_text", heroBannerSubtitle);
    formData.append("instagram_link", footerSocialIcons.instagram);
    formData.append("facebook_link", footerSocialIcons.facebook);
    formData.append("tiktok_link", footerSocialIcons.tiktok);
    formData.append("x_twiter_link", footerSocialIcons.twitter);
    formData.append("menu_item_colour", navigationForegroudColor);
    formData.append("payout_method", "crypto");
    formData.append("hero_title", heroBannerTitle);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    storeMutation.mutate(formData);
  };

  return (
    <div className="hidde flex flex-col lg:flex-row relative">
      {showProductsPopup && (
        <Productspopup
          onSave={handleSaveProducts}
          onCancel={() => setShowProductsPopup(false)}
          products={productsData}
        />
      )}

      <div className="lg:min-w-[304px] max-w-[304px] absolut top-0 z-40 p-4 sticky h-[calc(100vh-6rem)] overflow-y-auto ">
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
                  editingSection === section.id ? " text-bluebutton" : ""
                }`}
              >
                <span>{section.name}</span>
                <div className="hover:bg-gray-100 rounded-full p-1 cursor-pointer">
                  <FiEdit2
                    className="text-md "
                    onClick={() => handleEditSection(section.id)}
                  />
                </div>
              </div>
              {editingSection === section.id &&
                section.id === "Navigation Bar" && (
                  <NavigationBarEditor
                    onSave={handleSaveNavBar}
                    onCancel={() => setEditingSection(null)}
                    initialSettings={navBarSettings}
                  />
                )}
              {editingSection === section.id &&
                section.id === "Hero Banner" && (
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
          <Button onClick={onSubmit}>
            {storeMutation.isPending ? "Creating Store..." : "Create Store"}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-cente  px-20">
        {/* buttons */}
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

        {/* views */}
        <div className="flex items-cente  p-4">
          <div className="relative b">
            {/* {activeView === "desktop" ? <Desktop /> : <Mobile />} */}
            <Desktop activeView={activeView} />
          </div>
        </div>
      </div>
    </div>
  );
}
