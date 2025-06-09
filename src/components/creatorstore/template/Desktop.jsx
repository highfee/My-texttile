import { cn } from "@/lib/utils";
import { useCreatorStore } from "@/store/useCreatorShopFront";
import { Menu, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaInstagram, FaTiktok, FaX } from "react-icons/fa6";

const Desktop = ({ activeView, data }) => {
  const {
    navigationBackgroudColor,
    navigationForegroudColor,
    storeLogo,
    setAllFromServer,
  } = useCreatorStore();

  useEffect(() => {
    if (data) {
      setAllFromServer(data);
    }
    // Only run on mount or when data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section
      className={cn(
        "bg-white shadow-md rounded-3xl p-4 min-w-[980px] select-none",
        {
          "min-w-[400px] w-[400px]": activeView === "mobile",
        }
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {}
      <p className="text-lg font-medium">
        {activeView === "desktop"
          ? "Desktop View"
          : activeView === "mobile"
          ? "Mobile View"
          : "Tablet View"}
      </p>

      {/* view */}

      <section className="border border-gray-300 rounded-2xl mt-4 pointer-events-none overflow-hidden">
        {/* header */}
        <Header
          navigationBackgroudColor={navigationBackgroudColor}
          navigationForegroudColor={navigationForegroudColor}
          storeLogo={storeLogo}
          activeView={activeView}
        />

        {/* hero */}
        <Hero activeView={activeView} />

        {/* products */}
        <Products activeView={activeView} />

        {/* footer */}
        <Footer activeView={activeView} />
      </section>
    </section>
  );
};

export default Desktop;

const Header = ({
  navigationBackgroudColor,
  navigationForegroudColor,
  storeLogo,
  activeView,
}) => {
  return (
    <header
      className={cn("flex justify-between items-center p-4 px-10", {
        "px-4": activeView === "mobile",
      })}
      style={{ backgroundColor: navigationBackgroudColor }}
    >
      {/* logo */}
      <div
        className={cn("flex items-center", { hidden: activeView === "mobile" })}
      >
        <Image
          src={storeLogo}
          alt="Store Logo"
          width={80}
          height={30}
          className={cn("h-7 w-auto object-contain", {
            hidden: activeView === "mobile",
          })}
        />
      </div>

      <Menu size={18} className={cn({ hidden: activeView == "desktop" })} />

      <div
        className={cn("flex items-center space-x-2", {
          hidden: activeView == "desktop",
        })}
      >
        <ShoppingCart size={18} />
        <span>0</span>
      </div>

      {/* navigations */}
      <nav
        className={cn("flex space-x-4 text-base", {
          hidden: activeView === "mobile",
        })}
        style={{ color: navigationForegroudColor }}
      >
        <Link href={""} className="font-medium">
          Home
        </Link>
        <Link href={""}>Apparel</Link>
      </nav>

      {/* search  and cart*/}
      <div
        className={cn("flex items-center space-x-4 ", {
          hidden: activeView === "mobile",
        })}
      >
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 bg-white">
          <Search className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none text-sm bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Cart */}
        <div
          // onClick={toggleCart}
          className="flex items-center space-x-1 cursor-pointer"
        >
          <ShoppingBag className="h-5 w-5 text-black" />
          <span className="text-sm text-gray-700">0</span>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ activeView }) => {
  const {
    heroBannerTitle,
    heroBannerSubtitle,
    heroBannerImage,
    heroBannerCtaText,
  } = useCreatorStore();
  return (
    <section
      className={cn(
        " bg-cover bg-center h-[400px] flex flex-col items-center justify-center text-white relative isolate",
        {
          "h-[300px]": activeView === "mobile",
        }
      )}
      style={{
        backgroundImage: `url(${heroBannerImage})`,
      }}
    >
      <div className="absolute bg-black/50 inset-0 -z-10"></div>

      <h1
        className={cn("text-4xl max-w-[400px] text-center", {
          "text-2xl": activeView === "mobile",
        })}
      >
        {heroBannerTitle}
      </h1>

      <p
        className={cn("text-lg text-center mt-4", {
          "text-sm mx-5": activeView === "mobile",
        })}
      >
        {heroBannerSubtitle}
      </p>

      <Link
        href={""}
        className={cn(
          "bg-black text-white px-6 py-2 rounded mt-4 hover:bg-gray-800 transition",
          {
            "text-sm": activeView === "mobile",
          }
        )}
      >
        {heroBannerCtaText}
      </Link>
    </section>
  );
};

const Products = ({ activeView }) => {
  const { navigationBackgroudColor, products, addProduct } = useCreatorStore();

  return (
    <section
      className={cn("min-h-48 mx-10 mt-5", {
        "mx-4": activeView === "mobile",
      })}
      // style={{ background: navigationBackgroudColor }}
    >
      {products.length > 0 ? (
        <div
          className={cn("grid grid-cols-3 gap-5 p-4", {
            "grid-cols-2": activeView === "mobile",
          })}
        >
          {products.map((product) => (
            <div key={product.id} className=" ">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="h- w-full object-contain mb-2 rounded-md"
              />

              <section className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium text-gray-800">
                    {product.name}
                  </h2>
                  <span className="text-xs font-normal ">${product.price}</span>
                </div>

                <ShoppingCart size={18} />
              </section>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-xl italic h-full flex items-center justify-center min-h-48">
          No products available
        </p>
      )}
    </section>
  );
};

const Footer = ({ activeView }) => {
  const {
    footerCopyrightText,
    footerBackgroundColor,
    footerForegroundColor,
    storeName,
    footerSocialIcons,
  } = useCreatorStore();

  return (
    <footer
      className=" p-6 py-8"
      style={{
        backgroundColor: footerBackgroundColor,
        color: footerForegroundColor,
      }}
    >
      <section
        className={cn("flex justify-between items-center gap-3", {
          "flex-col": activeView == "mobile",
        })}
      >
        <h2 className="text-center text-lg">{storeName}</h2>

        {/* socials */}
        <div className="flex space-x-4">
          <Link href={""}>
            <FaInstagram />
          </Link>
          <Link href={""}>
            <FaFacebook />
          </Link>
          <Link href={""}>
            <FaTiktok />
          </Link>
          <Link href={""}>
            <FaTwitter />
          </Link>
        </div>
      </section>

      <nav
        className={cn("flex justify-center space-x-4 mt-3 ", {
          "text-sm": activeView == "mobile",
        })}
      >
        <Link href={""}>Track Item</Link>
        <Link href={""}>Support</Link>
        <Link href={""}>Contact us</Link>
        <Link href={""}>Refund Policy</Link>
      </nav>

      <section
        className={cn("mt-7 flex justify-between items-center", {
          "flex-col text-sm": activeView == "mobile",
        })}
      >
        <p>
          &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          <p>Powered by</p>
          <img
            src="/dashboard/completelogo.svg"
            alt="MyTextil Logo"
            className="h-8"
          />
        </div>

        <div>
          <Link href={""}>Privacy Policy</Link>
          <Link href={""}>Term of Service</Link>
        </div>
      </section>
    </footer>
  );
};
