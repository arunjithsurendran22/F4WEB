import React, { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { categoryApi } from "@/services/categoryService";

interface ICategory {
  categoryIcon: string;
  categoryName: string;
  sortNumber: number;
  _id: string;
}

function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const accessToken =
      typeof window !== "undefined"
        ? window.localStorage.getItem("accessToken")
        : "";
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();

        if (response.data) {
          setCategories(response.data.categories);
        } else {
          console.log("failed to fetch categories!");
        }
      } catch (err) {
      } finally {
      }
    };

    fetchCategories();
    setIsLoggedIn(!!accessToken);
  }, []);

  const checkAccessible = () => {
    !isLoggedIn ? toast.error("Please login to continue!") : "";
  };

  return (
    <footer id="footer">
      <div className="bg-customBlack text-white p-4 md:pt-10 md:px-16">
        {/* Main container for the footer */}
        <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 lg:gap-16">
          {/* Left section */}
          <div className="w-full sm:w-8/12 lg:w-6/12">
            <div className="mb-4">
              <h1 className="text-4xl font-bold">F4Fish</h1>
            </div>
            <div className="mb-4">
              <p className="text-customGrayLight2 text-sm md:text-base">
                Morbi cursus porttitor enim lobortis molestie. Duis gravida
                turpis dui, eget bibendum magna congue nec.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-10">
              <div>
                <span className="underline decoration-customGreenLite decoration-2 underline-offset-4 text-xs sm:text-sm">
                  (+91) 9148344848
                </span>
                <span className="ml-4 text-customGrayLight2 hidden sm:inline">
                  or
                </span>
              </div>
              <div>
                <span className="underline decoration-customGreenLite decoration-2 underline-offset-4 text-xs sm:text-sm">
                  support@f4fish.com
                </span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4">
            {/* My Account */}
            <div>
              <p className="text-lg font-semibold mb-5">My Account</p>
              <ul className="space-y-2">
                <li className="text-customGrayLight2">
                  <Link
                    href={isLoggedIn ? "/profile" : ""}
                    onClick={checkAccessible}
                  >
                    My Account
                  </Link>
                </li>
                <li className="text-customGrayLight2">
                  <Link
                    href={isLoggedIn ? "/profile/my-orders" : ""}
                    onClick={checkAccessible}
                  >
                    Order History
                  </Link>
                </li>
                <li className="text-customGrayLight2">
                  <Link
                    href={isLoggedIn ? "/cart" : ""}
                    onClick={checkAccessible}
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li className="text-customGrayLight2">
                  <Link
                    href={isLoggedIn ? "/wishlist" : ""}
                    onClick={checkAccessible}
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Helps */}
            <div>
              <p className="text-lg font-semibold mb-5">Helps</p>
              <ul className="space-y-2">
                <li className="text-customGrayLight2">Contact</li>
                <li className="text-customGrayLight2">FAQs</li>

                <li className="text-customGrayLight2">
                  <Link
                    href={"https://f4fish.com/terms-and-conditions"}>
                    Terms & Condition
                  </Link>
                </li>

                <li className="text-customGrayLight2">
                  <Link
                    href={"https://f4fish.com/privacy-policy"}>
                    Privacy Policy
                  </Link>
                </li>

              </ul>
            </div>

            {/* Proxy */}
            <div>
              <p className="text-lg font-semibold mb-5">Proxy</p>
              <ul className="space-y-2">
                <li className="text-customGrayLight2">About</li>
                <li className="text-customGrayLight2">Shop</li>
                <li className="text-customGrayLight2">Product</li>
                <li className="text-customGrayLight2">Track Order</li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <p className="text-lg font-semibold mb-5">Categories</p>
              <ul className="space-y-2">
                {categories.map(
                  (category, index) =>
                    index < 4 && (
                      <li className="text-customGrayLight2" key={category._id}>
                        <Link href={`/products-by-category?id=${category._id}`}>
                          {category.categoryName}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t-[.5px] border-customGrayLight3 flex flex-wrap justify-between items-center py-4 mt-10 gap-4">
          {/* Left-aligned text */}
          <p className="text-sm text-customGrayLight2">
            F4Fish © 2024. All Rights Reserved
          </p>

          {/* Right-aligned icons */}
          <div className="flex flex-wrap gap-4">
            <div className="px-3 py-[.2rem] border border-customGrayLight3 rounded-lg flex justify-center items-center">
              <Image
                src="/icons/ApplePay (1).png"
                alt="Apple Pay"
                width={34}
                height={34}
              />
            </div>
            <div className="px-3 py-[.2rem] border border-customGrayLight3 rounded-lg flex justify-center items-center">
              <Image
                src="/icons/visa-logo.png"
                alt="Visa"
                width={34}
                height={34}
              />
            </div>
            <div className="px-3 py-[.2rem] border border-customGrayLight3 rounded-lg flex justify-center items-center">
              <Image
                src="/icons/Discover.png"
                alt="Discover"
                width={34}
                height={34}
              />
            </div>
            <div className="px-3 py-[.2rem] border border-customGrayLight3 rounded-lg flex justify-center items-center">
              <Image
                src="/icons/Mastercard.png"
                alt="Mastercard"
                width={34}
                height={34}
              />
            </div>
            <div className="px-3 py-[.2rem] border border-customGrayLight3 rounded-lg flex justify-center items-center">
              <div>
                <div className="flex">
                  <Image
                    src="/icons/Group.png"
                    alt="Group Payment"
                    width={12}
                    height={12}
                  />
                  <span className="text-xs ml-2">Secure</span>
                </div>
                <p>Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
