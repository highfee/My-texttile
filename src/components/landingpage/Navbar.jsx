import React, { useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Loginoptions from "../signup/Loginoptions";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const creatorsRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };
  return (
    <>
      <nav className="w-full bg-white py-4">
        <div className="px-8 flex justify-between items-center">
          <div>
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

          <button
            className="hidden md:block bg-white text-gray-700 px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
            onClick={() => setIsLoginPopupOpen(true)}
          >
            Sign In
          </button>

          <button
            className="md:hidden text-2xl shadow-md rounded-md p-1"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          ></div>
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

          <button
            className="w-full bg-white text-gray-700 px-6 py-2 rounded-md border border-[#121212] hover:bg-[#dfdfdf]"
            onClick={() => setIsLoginPopupOpen(true)}
          >
            Sign up
          </button>
        </div>
      </nav>

      {isLoginPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          // onClick={() => setIsLoginPopupOpen(false)}
          // ife: clicking outside the main modal component should not close the Dialog box, as user can lose progress, else states are persisted
        >
          <button
            className="absolute hidden md:block top-8 right-[220px] z-10 text-white rounded-full p-1"
            onClick={() => setIsLoginPopupOpen(false)}
          >
            <FiX size={20} />
          </button>
          <div
            className="relative max-w-6xl "
            onClick={(e) => e.stopPropagation()}
          >
            <Loginoptions />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
