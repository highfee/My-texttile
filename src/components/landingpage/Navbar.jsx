"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Loginoptions from "../signup/Loginoptions";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";

import Auth_Dailog from "./Auth_Dailog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const Navbar = ({ homeRef, featuresRef, creatorsRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dropdownRef = useRef(null);

  const { session, clearSession } = useAuthStore();

  console.log(session);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setIsDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    // Handle navigation logic here
    setIsDropdownOpen(false);
  };

  if (!isClient) return null;

  return (
    <>
      <nav className="w-full bg-white py-4">
        <div className="px-8 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center">
              <img
                src="/mobile-logo.svg"
                alt="logo"
                className="h-10 w-auto md:hidden"
              />
              <img
                src="/mytexttile-logo.svg"
                alt="logo"
                className="h-10 w-auto hidden md:block"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-[#121212]">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="hover:text-gray-700"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="hover:text-gray-700"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(creatorsRef)}
              className="hover:text-gray-700"
            >
              Creators
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile Dropdown - Visible on both mobile and desktop */}

            {/* FAIQA--------- I worked on this already, ignore it when merging conflict */}
            {/* <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img 
                  src="/dashboard/Profile-pic.svg" 
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <IoIosArrowDown
                  className={`w-4 h-4 transition-transform  ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleNavigation("account")}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleNavigation("affiliateprogram")}
                      >
                        Affiliate Program
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleNavigation("store")}
                      >
                        Store
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleNavigation("campaign")}
                      >
                        Campaign
                      </button>
                    </li>
                    {session && (
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div> */}

            {session ? (
              <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center relative cursor-pointer">
                      <Avatar>
                        <AvatarImage src={session?.user?.profile_photo} />
                        <AvatarFallback>
                          {session?.user.first_name[0].toUpperCase()}
                          {session?.user.last_name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown color="#333" size={16} />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-[200px] bg-[#F3F6F8]">
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Link href={"/dashboard/settings"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Link href={"/dashboard/affiliateprogram"}>
                        Affiliate Program
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-200" />

                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Link href={"/dashboard/store"}>Store</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-200" />

                    <DropdownMenuItem className="p-2 cursor-pointer">
                      <Link href={"/dashboard/campaign"}>Campaign</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-200" />

                    <DropdownMenuItem
                      className="p-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <p>{session?.user?.first_name}</p>
              </div>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild className="hidden md:block">
                  <button
                    className="w-full bg-white text-gray-700 px-6 py-2 rounded-md border border-[#121212] hover:bg-[#dfdfdf]"
                    // onClick={() => setIsLoginPopupOpen(true)}
                  >
                    Sign In
                  </button>
                </AlertDialogTrigger>

                <Auth_Dailog />
              </AlertDialog>
            )}

            <button
              className="md:hidden text-2xl shadow-md rounded-md p-1"
              onClick={() => setIsOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div
          className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end">
            <button className="text-2xl" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 py-4 text-[#121212]">
            <button
              onClick={() => scrollToSection(homeRef)}
              className="hover:text-gray-700"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="hover:text-gray-700"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(creatorsRef)}
              className="hover:text-gray-700"
            >
              Creators
            </button>
          </nav>

          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="w-full bg-white text-gray-700 px-6 py-2 rounded-md border border-[#121212] hover:bg-[#dfdfdf]"
                // onClick={() => setIsLoginPopupOpen(true)}
              >
                Sign In
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <Auth_Dailog />
            </AlertDialogContent>
          </AlertDialog> */}
        </div>
      </nav>

      {/* Login Popup */}
      {/* {isLoginPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <button
            className="absolute hidden md:block top-8 right-[220px] z-10 text-white rounded-full p-1"
            onClick={() => setIsLoginPopupOpen(false)}
          >
            <FiX size={20} />
          </button>
          <div
            className="relative max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Loginoptions />
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
