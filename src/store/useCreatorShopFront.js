import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 */

/** @type {Product[]} */
const productsSample = [];

export const useCreatorStore = create(
  // Uncomment to enable persistence:
  persist(
    (set) => ({
      storeName: "",
      storeLogo: null,
      storeLogoFile: null,
      navigationBackgroundColor: "#979797",
      navigationForegroundColor: "#333333",
      heroBannerTitle: null,
      heroBannerSubtitle: null,
      heroBannerImage: null,
      heroBannerImageFile: null,
      heroBannerCtaText: null,
      heroBannerCtaLink: null,
      footerCopyrightText: null,
      storeAvailableColors: [],
      footerSocialIcons: {
        instagram: "",
        facebook: "",
        tiktok: "",
        twitter: "",
      },
      footerBackgroundColor: "#979797",
      footerForegroundColor: "#222222",
      products: productsSample,

      // Setters
      setStoreName: (storeName) => set({ storeName }),
      setStoreLogo: (storeLogo) => set({ storeLogo }),
      setStoreLogoFile: (storeLogoFile) => set({ storeLogoFile }),
      setNavigationBackgroundColor: (navigationBackgroundColor) =>
        set({ navigationBackgroundColor }),
      setNavigationForegroundColor: (navigationForegroundColor) =>
        set({ navigationForegroundColor }),
      setHeroBannerTitle: (heroBannerTitle) => set({ heroBannerTitle }),
      setHeroBannerSubtitle: (heroBannerSubtitle) =>
        set({ heroBannerSubtitle }),
      setHeroBannerImage: (heroBannerImage) => set({ heroBannerImage }),
      setHeroBannerImageFile: (heroBannerImageFile) =>
        set({ heroBannerImageFile }),
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
      setStoreAvailableColors: (color) =>
        set((state) => {
          const exists = state.storeAvailableColors.includes(color);
          return {
            storeAvailableColors: exists
              ? state.storeAvailableColors.filter((c) => c !== color)
              : [...state.storeAvailableColors, color],
          };
        }),

      /**
       * Set all store fields from server data.
       * @param {Object} data
       */
      setAllFromServer: (data) =>
        set((state) => ({
          storeName: data.shop_name ?? state.storeName,
          storeLogo: data.shop_logo ?? state.storeLogo,
          navigationBackgroundColor:
            data.background_colour ?? state.navigationBackgroundColor,
          navigationForegroundColor:
            data.text_colour ?? state.navigationForegroundColor,
          heroBannerTitle: data.hero_title ?? state.heroBannerTitle,
          heroBannerSubtitle: data.hero_text ?? state.heroBannerSubtitle,
          heroBannerImage: data.shop_banner ?? state.heroBannerImage,
          heroBannerCtaText: data.heroBannerCtaText ?? state.heroBannerCtaText,
          products: data.products ?? state.products,
          footerCopyrightText:
            data.footerCopyrightText ?? state.footerCopyrightText,
          footerBackgroundColor:
            data.footerBackgroundColor ?? state.footerBackgroundColor,
          footerForegroundColor:
            data.footerForegroundColor ?? state.footerForegroundColor,
          footerSocialIcons: {
            instagram: data.instagram_link ?? state.footerSocialIcons.instagram,
            facebook: data.facebook_link ?? state.footerSocialIcons.facebook,
            tiktok: data.tiktok_link ?? state.footerSocialIcons.tiktok,
            twitter: data.x_twiter_link ?? state.footerSocialIcons.twitter,
          },
          storeAvailableColors: data.colors ?? state.storeAvailableColors,
        })),
    }),
    { name: "creator-store" }
  )
);
