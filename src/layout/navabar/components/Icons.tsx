import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CiHeart, CiUser } from "react-icons/ci";
import { SlHandbag } from "react-icons/sl";
import { IoNotificationsOutline } from "react-icons/io5";
import RightSidebar from "@/components/ui/RightSidebar/RightSidebar";
import Notifications from "@/components/notifications/Notifications";
import Modal from "@/components/ui/modal/Modal";
import SignIn from "@/components/login/SignIn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchFavourites } from "@/store/wishListSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

function Icons() {
  const dispatch = useAppDispatch();
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const count = useSelector((state: RootState) => state.wishList.count);
  const storeId = useAppSelector((state: RootState) => state.location.storeId);

  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isProfilePopupVisible, setProfilePopupVisible] =
    useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(itemCount);
  const [wishListCount, setWishListCount] = useState<number>(count);
  const router = useRouter();

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";

    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    setCartCount(itemCount);
  }, [itemCount]);

  useEffect(() => {
    setWishListCount(count);
  }, [count, loading]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        await dispatch(fetchFavourites() as any).unwrap();
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavorites();
  }, [dispatch]);

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
    const accessToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";

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
  };

  const onNotificationCountChange = (count: number) => {
    setNotificationCount(count);
  };

  const checkAccessible = () => {
    !isLoggedIn ? toast.error("Please login to continue!") : "";
    !storeId ? toast.error("Please select nearby store!") : "";
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
      if (typeof window !== "undefined")
        document.addEventListener("click", handleClickOutside);
    }

    if (typeof window !== "undefined") {
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isProfilePopupVisible]);

  return (
    <div className="flex gap-12 justify-end items-center">
      <Link
        href={isLoggedIn && storeId ? `/wishlist` : ""}
        onClick={checkAccessible}
        className="relative"
      >
        <CiHeart className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl" />
        {storeId && wishListCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
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

        {storeId && cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
            {cartCount}
          </span>
        )}
      </Link>

      <div className="relative">
        <IoNotificationsOutline
          onClick={isLoggedIn ? toggleSidebar : checkAccessible}
          className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-4xl"
        />
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-[9px] font-semibold w-3 h-3 flex items-center justify-center p-2">
            {notificationCount}
          </span>
        )}
      </div>

      <div className="relative">
        <CiUser
          onClick={toggleProfilePopup}
          className="text-customGrayLight2 hover:text-customGrayLight5 transition-opacity duration-200 cursor-pointer text-3xl"
        />

        {isProfilePopupVisible && (
          <div
            id="profile-popup"
            className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg font-semibold z-10 p-4"
          >
            {isLoggedIn && (
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 rounded-lg"
                onClick={() => setProfilePopupVisible(false)}
              >
                Profile
              </Link>
            )}
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

      <Link href={isLoggedIn ? `/profile` : ""} onClick={checkAccessible}>
        <Image
          src="/icons/king.png"
          alt="king Icon"
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
        <div>
          <Notifications
            onNotificationCountChange={onNotificationCountChange}
          />
        </div>
      </RightSidebar>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title=""
        showCloseButton={false}
      >
        <SignIn closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default Icons;
