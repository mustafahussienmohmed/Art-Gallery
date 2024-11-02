"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Shop</h4>
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Specials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Policies</h4>
            <ul>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-yellow-400"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-yellow-400">
                <FaFacebookF size={20} />
              </Link>
              <Link href="/" className="hover:text-yellow-400">
                <FaTwitter size={20} />
              </Link>
              <Link href="/" className="hover:text-yellow-400">
                <FaInstagram size={20} />
              </Link>
              <Link href="/" className="hover:text-yellow-400">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>© 2024 ARTZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
