"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import Modal from "@/components/ui/modal/Modal";
import LogoutCard from "@/components/logoutCard/LogoutCard";

const ProfileSideBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsModalOpen(false);
    window.location.href = "/"; // Perform logout and redirect
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    setIsSidebarOpen(false); // Close sidebar on navigation for small screens
  };

  return (
    <>
      {/* Overlay for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 h-full transition-transform bg-white shadow-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:shadow-none md:w-64 lg:w-80`}
      >
        <div className="p-6 flex flex-col justify-between">
          <ul className="space-y-8 ">
            {[
              {
                href: "/profile/my-orders",
                label: "My Orders",
                icon: "/icons/myorder.png",
              },
              {
                href: "/profile/my-address",
                label: "My Address",
                icon: "/icons/location2.png",
              },
              {
                href: "/profile/refferals",
                label: "Referrals",
                icon: "/icons/referel.png",
              },
              {
                href: "/profile/coins",
                label: "Coins",
                icon: "/icons/paid.png",
              },
              {
                href: "/profile/contact",
                label: "Contact",
                icon: "/icons/call2.png",
              },
              {
                href: "/profile/tickets",
                label: "Tickets",
                icon: "/icons/contact_support.png",
              },
              {
                href: "/profile/terms-conditions",
                label: "Terms and Conditions",
                icon: "/icons/contact_page.png",
              },
              {
                href: "/profile/help-and-support",
                label: "Help and Support",
                icon: "/icons/support_agent.png",
              },
            ].map((item) => (
              <li
                key={item.href}
                className={`flex justify-between items-center text-customGray cursor-pointer p-3 ${
                  selectedItem === item.href
                    ? "bg-customBlueLight3 text-black"
                    : ""
                }`}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={() => handleNavigate(item.href)}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span className="hidden md:block font-medium">
                    {item.label}
                  </span>
                </div>
                <IoIosArrowForward
                  className="text-xl text-customGrayLight2"
                  onClick={() => handleNavigate(item.href)}
                />
              </li>
            ))}
            <li
              onClick={handleLogoutClick}
              className="flex justify-between items-center text-customRed cursor-pointer p-3"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/logout.png"
                  alt="Logout"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span className="hidden md:block font-medium">Log Out</span>
              </div>
              <IoIosArrowForward className="text-xl text-customGrayLight2" />
            </li>
          </ul>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <LogoutCard
              setIsModalOpen={setIsModalOpen}
              handleConfirmLogout={handleConfirmLogout}
            />
          </Modal>
        </div>
      </div>

      <button
        className="fixed z-50 top-60 left-4 bg-gray-300 p-1 rounded-xl shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Toggle Sidebar</span>
        {isSidebarOpen ? (
          <IoMdArrowDropleft className="text-2xl text-black" />
        ) : (
          <IoMdArrowDropright className="text-2xl text-black" />
        )}
      </button>
    </>
  );
};

export default ProfileSideBar;
