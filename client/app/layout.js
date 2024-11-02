"use client";

import localFont from "next/font/local";
import "./globals.css";
import Footer from "./ui/Footer";
import MainNav from "./ui/navbar";
import { AuthProvider } from "./context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your website description here" />
        <title>Your Website Title</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {/* <MainNav /> */}
          {children}
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
