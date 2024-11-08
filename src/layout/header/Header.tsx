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
        <header className="bg-customBlue text-white py-4 px-14 flex justify-between items-center">
          <nav className="space-x-6">
            <a href="/" className="text-gray-300 font-medium no-underline hover:text-white">Home</a>
            <a href="/categories" className="text-gray-300 font-medium no-underline hover:text-white">Categories</a>
            <a href="/" className="text-gray-300 font-medium no-underline hover:text-white">Offers</a>
            <a href="/" className="text-gray-300 font-medium no-underline hover:text-white">Contact Us</a>
          </nav>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Image src="/icons/call.png" alt="Call Icon" width={20} height={20} />
            <a href="tel:+1234567890" className="no-underline hover:text-white">+1 (234) 567-890</a>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
