"use client"; // Ensure this file is rendered on the client side

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // import useRouter for navigation
import Modal from "@/components/ui/modal/Modal";
import LogoutCard from "@/components/logoutCard/LogoutCard";

const ProfileSideBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter(); // useRouter for manual navigation
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to navigate programmatically
  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div
      className={`${
        isSidebarOpen
          ? "absolute w-96 bg-white z-50 pl-14 py-10 flex flex-col justify-between"
          : "w-32 xl:w-[26rem] pl-14 py-10 flex flex-col justify-between"
      } `}
    >
      <ul className="space-y-8">
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
          { href: "/profile/coins", label: "Coins", icon: "/icons/paid.png" },
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
        ].map((item) => (
          <li
            key={item.href}
            className={`flex justify-between items-center text-customGray cursor-pointer p-3 ${
              selectedItem === item.href ? "bg-customBlueLight3 text-black" : ""
            }`}
          >
            <div
              className="flex items-center gap-2"
              onClick={() => handleNavigate(item.href)} // Add click handler for both icon and text
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
                className="mr-2"
              />
              {/* Show label only on lg and larger screens */}
              <Link
                href={item.href}
                className={`${
                  isSidebarOpen ? "block" : "hidden xl:block font-medium"
                }`}
              >
                {item.label}
              </Link>
            </div>
            <IoIosArrowForward
              className="text-xl text-customGrayLight2"
              onClick={ ()=>handleNavigate(item.href)}
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
            {/* Show "Log Out" only on lg and larger screens */}
            <span
              className={`${
                isSidebarOpen ? "block" : "hidden xl:block font-medium"
              }`}
            >
              Log Out
            </span>
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
  );
};

export default ProfileSideBar;
