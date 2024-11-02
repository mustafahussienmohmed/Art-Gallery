"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const { userData, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const itemList = [
    { name: "All Categories", path: "/" },
    { name: "Painting", path: "/customer/Painting" },
    { name: "Sculpture", path: "/customer/Sculpture" },
    { name: "Photography", path: "/customer/Photography" },
    { name: "Digital Art", path: "/customer/DigitalArt" },
  ];

  // Function to toggle the mobile menu
  function handelToggle() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <>
      <nav className="bg-white border border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 shadow relative">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="text-3xl font-bold">
            <Image
              src={"/logo_1.avif"}
              className="rounded-full bg-yellow-400 p-2"
              alt={`Logo`}
              width={120}
              height={120}
            />
          </Link>

          <div className="flex items-center">
            <button
              id="menu-toggle"
              type="button"
              onClick={handelToggle}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:items-center">
              <li>
                <div
                  className={`flex items-center w-[50%] ${
                    isMenuOpen ? "block" : "hidden"
                  } md:flex`}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a product..."
                    className="w-80 p-2 rounded-l-md outline-none text-black h-10"
                  />
                  <button className="bg-yellow-400 p-2 rounded-r-md hover:bg-yellow-500 h-10">
                    <CgSearch size="24px" className="text-black" />
                  </button>
                </div>
              </li>
              {userData ? (
                <>
                  <li>
                    <Link
                      href="/Profile"
                      className="hover:bg-gray-600 px-4 py-2 text-white text-lg mt-3"
                    >
                      {userData.name}
                    </Link>
                  </li>
                  <li
                    className="hover:bg-gray-600 cursor-pointer text-lg text-white px-4 py-2"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/customer/login"
                      className="hover:bg-gray-600  text-lg text-white px-4 py-2"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/customer/signup"
                      className="hover:bg-gray-600  text-lg text-white px-4 py-2"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              {itemList.map((item, index) => (
                <li key={index} className="  md:hidden">
                  <Link
                    href={item.path}
                    key={index}
                    className="hover:bg-gray-600 px-4 py-2 rounded-md text-white text-lg"
                  >
                    {item.name}
                  </Link>{" "}
                </li>
              ))}
              <li>
                <Link href="/cart">
                  <div className="relative cursor-pointer flex items-center ">
                    <BiCart
                      size="32px"
                      className="text-white hover:bg-gray-600 "
                    />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={` w-full bg-gray-700 text-white py-2 hidden md:block`}>
        <div className="container  flex justify-center space-x-4  ">
          {itemList.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                key={index}
                className="hover:bg-gray-600 px-4 py-2 rounded-md"
              >
                {item.name}
              </Link>{" "}
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
