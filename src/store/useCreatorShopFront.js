import { create } from "zustand";
import { persist } from "zustand/middleware";

const productsSample = [
  // {
  //   id: 1,
  //   name: "Product 1",
  //   description: "Description for Product 1",
  //   price: 19.99,
  //   image: "/creatorstore/shirt5.png",
  // },
  // {
  //   id: 2,
  //   name: "Product 2",
  //   description: "Description for Product 2",
  //   price: 29.99,
  //   image: "/creatorstore/shirt3.png",
  // },
  // {
  //   id: 2,
  //   name: "Product 2",
  //   description: "Description for Product 2",
  //   price: 29.99,
  //   image: "/creatorstore/shirt3.png",
  // },
];

export const useCreatorStore = create(
  // persist(
  (set) => ({
    storeName: "",
    storeLogo: null,
    storeLogoFile: null,
    navigationBackgroudColor: "#979797",
    navigationForegroudColor: "#333333",
    heroBannerTitle: null,
    heroBannerSubtitle: null,
    heroBannerImage: null,
    heroBannerImageFile: null,
    heroBannerCtaText: null,
    heroBannerCtaLink: null,
    footerCopyrightText: null,
    footerSocialIcons: {
      instagram: "",
      facebook: "",
      tiktok: "",
      twitter: "",
    },
    footerBackgroundColor: "#979797",
    footerForegroundColor: "#222222",
    products: productsSample,
    setStoreName: (storeName) => set({ storeName }),
    setStoreLogo: (storeLogo) => set({ storeLogo }),
    setNavigationBackgroudColor: (navigationBackgroudColor) =>
      set({ navigationBackgroudColor }),
    setNavigationForegroudColor: (navigationForegroudColor) =>
      set({ navigationForegroudColor }),
    setHeroBannerTitle: (heroBannerTitle) => set({ heroBannerTitle }),
    setHeroBannerSubtitle: (heroBannerSubtitle) => set({ heroBannerSubtitle }),
    setHeroBannerImage: (heroBannerImage) => set({ heroBannerImage }),
    setHeroBannerCtaText: (heroBannerCtaText) => set({ heroBannerCtaText }),
    setHeroBannerCtaLink: (heroBannerCtaLink) => set({ heroBannerCtaLink }),
    setFooterCopyrightText: (footerCopyrightText) =>
      set({ footerCopyrightText }),

    setFooterBackgroundColor: (footerBackgroundColor) =>
      set({ footerBackgroundColor }),
    setFooterForegroundColor: (footerForegroundColor) =>
      set({ footerForegroundColor }),
    setProducts: (products) => set({ products }),
    addProduct: (product) =>
      set((state) => ({ products: [...state.products, product] })),
    setFooterSocialIcons: (socialIcons) =>
      set((state) => ({
        footerSocialIcons: {
          ...state.footerSocialIcons,
          ...socialIcons,
        },
      })),
    setStoreLogoFile: (storeLogoFile) => set({ storeLogoFile }),
    setHeroBannerImageFile: (heroBannerImageFile) =>
      set({ heroBannerImageFile }),

    setAllFromServer: (data) =>
      set((state) => ({
        // Map backend keys to frontend state keys
        storeName: data.shop_name || state.storeName,
        storeLogo: data.shop_logo || state.storeLogo,
        navigationBackgroudColor:
          data.background_colour || state.navigationBackgroudColor,
        navigationForegroudColor:
          data.text_colour || state.navigationForegroudColor,
        heroBannerTitle: data.hero_title || state.heroBannerTitle,
        heroBannerSubtitle: data.hero_text || state.heroBannerSubtitle,
        heroBannerImage: data.shop_banner || state.heroBannerImage,
        heroBannerCtaText: data.heroBannerCtaText || state.heroBannerCtaText, // update if you have a backend key for this
        products: data.products || state.products, // update if you have products in backend
        footerCopyrightText:
          data.footerCopyrightText || state.footerCopyrightText, // update if you have a backend key for this
        footerBackgroundColor:
          data.footerBackgroundColor || state.footerBackgroundColor, // update if you have a backend key for this
        footerForegroundColor:
          data.footerForegroundColor || state.footerForegroundColor, // update if you have a backend key for this
        footerSocialIcons: {
          instagram: data.instagram_link || state.footerSocialIcons.instagram,
          facebook: data.facebook_link || state.footerSocialIcons.facebook,
          tiktok: data.tiktok_link || state.footerSocialIcons.tiktok,
          twitter: data.x_twiter_link || state.footerSocialIcons.twitter,
        },
      })),
  })

  // {
  //   name: "creator-store",
  // }
  // )
);
