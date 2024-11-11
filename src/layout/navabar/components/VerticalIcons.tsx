"use client";
import SignIn from "@/components/login/SignIn";
import Notifications from "@/components/notifications/Notifications";
import Modal from "@/components/ui/modal/Modal";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiHeart, CiUser } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import toast from "react-hot-toast";

interface VerticalIconsProps {
  closeSidebarVertical?: (() => void) | undefined;
}

const VerticalIcons: React.FC<VerticalIconsProps> = ({
  closeSidebarVertical,
}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);
  const wishListCount = useSelector((state: RootState) => state.wishList.count);
  const storeId = useSelector((state: RootState) => state.location.storeId);
  const router = useRouter();

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
    setIsLoggedIn(!!accessToken);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!isProfilePopupVisible);
  };

  const toggleLoginModal = () => {
    setModalOpen(true);
    setProfilePopupVisible(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  };

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("loggedIn", JSON.stringify(false));
    setIsLoggedIn(false);
    setProfilePopupVisible(false);
    await router.push("/");
    window.location.reload();
    if (closeSidebarVertical) {
      closeSidebarVertical();
    }
  };

  const onNotificationCountChange = (count: number) => {
    setNotificationCount(count);
  };

  const checkAccessible = () => {
    if (!isLoggedIn) toast.error("Please login to continue!");
    if (!storeId) toast.error("Please select nearby store!");
    if (closeSidebarVertical) {
      closeSidebarVertical;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest("#profile-popup") &&
        !(event.target as HTMLElement).closest("#profile-icon")
      ) {
        setProfilePopupVisible(false);
      }
    };

    if (isProfilePopupVisible) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfilePopupVisible]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 items-center">
        <Link
          href={isLoggedIn && storeId ? `/wishlist` : ""}
          onClick={checkAccessible}
          className="relative"
        >
          <CiHeart className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl" />
          {storeId && wishListCount > 0 && (
            <span className="absolute top-0 right-0 bg-customBlue text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
              {wishListCount}
            </span>
          )}
        </Link>

        <Link
          href={isLoggedIn && storeId ? `/cart` : ""}
          onClick={() => {
            if (!isLoggedIn || !storeId) {
              checkAccessible();
            }
          }}
          className="relative"
        >
          <SlHandbag className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-2xl" />
          {storeId && itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-customBlue text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
              {itemCount}
            </span>
          )}
        </Link>

        <IoNotificationsOutline
          onClick={isLoggedIn ? toggleSidebar : checkAccessible}
          className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl"
        />
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 bg-customBlue text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
            {notificationCount}
          </span>
        )}

        <div className="relative">
          <CiUser
            onClick={toggleProfilePopup}
            className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl"
          />

          {isProfilePopupVisible && (
            <div
              id="profile-popup"
              className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg font-semibold z-10 p-2"
            >
              {isLoggedIn && (
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 rounded-lg text-xs"
                  onClick={() => setProfilePopupVisible(false)}
                >
                  Profile
                </Link>
              )}
              {isLoggedIn ? (
                <button
                  className="block px-4 py-2 text-gray-700 rounded-lg w-full text-left text-xs"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="block px-4 py-2 text-gray-700 rounded-lg w-full text-left"
                  onClick={toggleLoginModal}
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>

        <Link href={isLoggedIn ? `/profile` : ""} onClick={checkAccessible}>
          <Image
            src="/icons/king.svg"
            alt="King Icon"
            width={32}
            height={32}
            className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          />
        </Link>

        <RightSidebar
          isVisible={isSidebarVisible}
          onClose={closeSidebar}
          title="Notification"
        >
          <Notifications
            onNotificationCountChange={onNotificationCountChange}
          />
        </RightSidebar>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title=""
          showCloseButton={false}
        >
          <SignIn closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default VerticalIcons;
