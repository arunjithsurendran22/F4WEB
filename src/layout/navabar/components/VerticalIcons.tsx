"use client";
import SignIn from "@/components/login/SignIn";
import Notifications from "@/components/notifications/Notifications";
import Modal from "@/components/ui/modal/Modal";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

function VerticalIcons() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    //const accessToken = localStorage.getItem("accessToken");
    const accessToken = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : ''

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

  const handleLogout =async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("loggedIn", JSON.stringify(false));
    setIsLoggedIn(false);
    setProfilePopupVisible(false);
    await router.push("/");
    window.location.reload();
  };
  const onNotificationCountChange = (count: number) => {
    setNotificationCount(count); // Update the notification count
  };

  const changeNotificationCount = () => {
    setNotificationCount(0)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest("#profile-popup") &&
        !(event.target as HTMLElement).closest("#profile-icon")
      ) {
        setProfilePopupVisible(false);
      }
    };

    if (typeof window !== 'undefined') {

      if (isProfilePopupVisible) {
        document.addEventListener("click", handleClickOutside);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isProfilePopupVisible]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-8 items-center ">
        {" "}
        {/* Vertical layout with flex-col */}
        <Link href="/wishlist">
          <CiHeart className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl" />
        </Link>
        <Link href="/cart">
          <SlHandbag className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-2xl" />
        </Link>
        <IoNotificationsOutline
          onClick={toggleSidebar}
          className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl"
        />
        <div className="relative">
          <CiUser
            onClick={toggleProfilePopup}
            className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl"
          />

          {/* Profile Popup */}
          {isProfilePopupVisible && (
            <div
              id="profile-popup"
              className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg font-semibold z-50 p-4"
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 rounded-lg"
                onClick={() => setProfilePopupVisible(false)} // Hide popup when clicked
              >
                Profile
              </Link>
              {isLoggedIn ? (
                <button
                  className="block px-4 py-2 text-gray-700 rounded-lg w-full text-left"
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
        <Link href="/profile">
          <Image
            src="/icons/king.png"
            alt="king Icon"
            width={32}
            height={32}
            className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          />
        </Link>
        {/* Right Sidebar for Notifications */}
        <RightSidebar
          isVisible={isSidebarVisible}
          onClose={closeSidebar}
          title="Notification"
        >
          <div>
            <Notifications
              onNotificationCountChange={onNotificationCountChange}
            />
          </div>
        </RightSidebar>
        {/* Modal for Login */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title=""
          showCloseButton={false}
        >
          <SignIn closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
}

export default VerticalIcons;
