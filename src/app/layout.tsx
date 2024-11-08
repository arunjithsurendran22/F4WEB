"use client";

import Navbar from "@/layout/navabar/Navbar";
import Footer from "@/layout/footer/Footer";
import "./globals.css";
import Header from "@/layout/header/Header";
import { Toaster } from "react-hot-toast";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Subscribe from "@/page-components/home/components/subscribe/Subscribe";
import { Suspense } from "react";
import { store } from "@/store";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Provider store={store}>
          {/* Global Navbar */}
          <Navbar />
          <Header />

          {/* Main Page Content */}
          <main>
            <Suspense
              fallback={
                <div>
                  <SpinnerLoader />
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Subscribe />
          {/* Global Footer */}
          <Footer />

          {/* Toast Notifications */}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
