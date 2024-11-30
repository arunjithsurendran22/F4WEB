"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";

function Header() {
  const storeId = useAppSelector((state: RootState) => state.location.storeId);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Ensure component only renders on the client

  return (
    <>
      {storeId && (
        <header className="bg-customBlue text-white py-3 px-4 md:py-4 md:px-14 flex flex-wrap justify-between items-center">
          {/* Navigation Links */}
          <nav className="w-full md:w-auto flex justify-center md:justify-start space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-lg font-medium mb-3 md:mb-0">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/categories"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="/all-offers"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Offers
            </a>
            <a
              href="#footer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Contact Us
            </a>
          </nav>

          {/* Contact Section */}
          <div className="flex justify-center md:justify-end items-center gap-2 w-full md:w-auto text-xs sm:text-sm md:text-lg font-semibold">
            <Image
              src="/icons/call.png"
              alt="Call Icon"
              width={20}
              height={20}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <a
              href="tel:+919148344848"
              className="no-underline hover:text-white transition-colors duration-200"
            >
              +91 9148344848
            </a>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
