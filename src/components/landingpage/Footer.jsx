import Link from "next/link";
import React from "react";
import { FaTwitter, FaFacebookF, FaTelegramPlane } from "react-icons/fa"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaXTwitter } from "react-icons/fa6";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black py-12 items-center justify-center   ">
      <div className="container px-4  lg:px-16 text-[16px] items-center ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="flex justify-start  md:mb-0">
            <img
              src="/landingpage/logo-f.svg" 
              alt="Logo"
              className="w-24 h-auto"
            />
          </div>
          <div className="md:hidden grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-white opacity-[0.44]">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white hover:opacity-75">
                    POD Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:opacity-75">
                    Affiliate Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:opacity-75">
                    Campaign
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:opacity-75">
                    Crypto Payment
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-white opacity-[0.44]">Contact Us</h3>
              <ul className="space-y-2 text-white">
                <li>(406) 556-0120</li>
                <li>4517 Washington Ave.</li>
                <li>Manchester, Kentucky 39495</li>
              </ul>
            </div>
          </div>
          <div className="hidden md:block space-y-4">
            <h3 className="text-white opacity-[0.44]">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:opacity-75">
                  POD Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:opacity-75">
                  Affiliate Program
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:opacity-75">
                  Campaign
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:opacity-75">
                  Crypto Payment
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden md:block space-y-4">
            <h3 className="text-white opacity-[0.44]">Contact Us</h3>
            <ul className="space-y-2 text-white">
              <li>(406) 556-0120</li>
              <li>4517 Washington Ave.</li>
              <li>Manchester, Kentucky 39495</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold text-white">
              Stay Updated with MyTextil to Newsletter
            </h3>
            <p className="hidden md:flex text-white opacity-[0.44] text-xs">
              Be the first to know about new campaigns, ambassador
              opportunities, and platform updates.
            </p>
            <div className="flex rounded-lg bg-white ">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-1 rounded-l-lg  focus:outline-none focus:border-blue-500"
              />
              <div className="p-2 ">
                <button className="  bg-[#016FDE] text-white px-2 py-1 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 md:pt-24">
          <div className="md:hidden flex flex-col items-center gap-4 text-white opacity-[0.44]">
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="hover:opacity-75">
                Legal
              </a>
              <a href="#" className="hover:opacity-75">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-75">
                Help Center
              </a>
            </div>
            <div className="flex gap-4">
            <Link href="https://x.com/MyTextil" className="hover:opacity-75">
                <FaXTwitter className="w-5 h-5" />
              </Link>
              <Link href=" https://www.facebook.com/groups/606185085573173/?ref=share&mibextid=NSMWBT" className="hover:opacity-75">
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link href="https://t.me/mytextilgroup" className="hover:opacity-75">
                <FaTelegramPlane className="w-5 h-5" />
              </Link>
              <Link href="https://www.tiktok.com/@mytextil" className="hover:opacity-75">
                <FontAwesomeIcon icon={faTiktok} className="w-5 h-5"  />
              </Link>
            </div>
            <div className="text-center">2025 MyTextil
</div>
          </div>
          <div className="hidden md:flex md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-white opacity-[0.44]">
              <a href="#" className="hover:opacity-75">
                2025 MyTextil

              </a>
              <a href="#" className="hover:opacity-75">
                Help Center
              </a>
              <a href="#" className="hover:opacity-75">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-75">
                Legal
              </a>
            </div>
            <div className="flex gap-4 text-white opacity-[0.44]">
              <Link href="https://x.com/MyTextil" className="hover:opacity-75">
                <FaXTwitter className="w-5 h-5" />
              </Link>
              <Link href=" https://www.facebook.com/groups/606185085573173/?ref=share&mibextid=NSMWBT" className="hover:opacity-75">
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link href="https://t.me/mytextilgroup" className="hover:opacity-75">
                <FaTelegramPlane className="w-5 h-5" />
              </Link>
              <Link href="https://www.tiktok.com/@mytextil" className="hover:opacity-75">
                <FontAwesomeIcon icon={faTiktok} className="w-5 h-5"  />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
