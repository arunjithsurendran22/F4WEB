"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/Buttons/Button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import QuantityButton from "../ui/Buttons/QuantityButton";
import { MdArrowForwardIos } from "react-icons/md";
import RightSidebar from "../ui/RightSidebar/RightSidebar";
import toast from "react-hot-toast";
import Customize from "../Customize/Customize";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { showLoginToast } from "@/utils/toastUtils";

interface ProductCardProps {
  _id: string;
  imageSrc: string;
  title: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  ratingCount?: number;
  offer?: number;
  hasSubProducts?: boolean;
  subscriptionProduct?: boolean | undefined;
  express?: boolean | undefined;
  storeId?: string;
}

const ProductCardHorizondal: React.FC<ProductCardProps> = ({
  _id,
  imageSrc,
  title,
  rating,
  price,
  originalPrice,
  ratingCount,
  offer,
  hasSubProducts,
  subscriptionProduct,
  express,
  storeId,
}) => {
  const loggedIn = useAppSelector((state: RootState) => state.profile.loggedIn);
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [shouldFetchSubProducts, setShouldFetchSubProducts] =
    useState<boolean>(false);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [quantityLoader, setQuantityLoader] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarVisible(true);
    setShouldFetchSubProducts(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setShouldFetchSubProducts(false);
  };

  const handleAddToCart = async () => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }

    if (hasSubProducts) {
      toggleSidebar();
    } else {
      if (hasSubProducts === false) {
        const item = {
          productId: _id,
          storeId: storeId,
          isSubProduct: false,
          subProductId: "",
          cartQuantity: 1,
          subscribedProduct: subscriptionProduct,
          expressProduct: express,
        };

        try {
          const response = await dispatch(addToCart(item) as any);
          if (response.payload && response.payload.cartData) {
            setIsProductInCart(true);
          }
        } catch (error: any) {
          console.error("Error adding to cart:", error.message);
          toast.error(
            error.message || "An error occurred while adding to cart."
          );
        }
      }
    }
  };

  const handleNavigate = (id: string) => {
    router.push(`/productDetails/${id}`);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const responseCart = await dispatch(fetchCartItems() as any).unwrap();

        const isInCart = responseCart.items.some(
          (item: any) => item.product._id === _id
        );
        setIsProductInCart(isInCart);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartData();
  }, [dispatch, _id]);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }
  
    // Set loader to true when starting the update
    setQuantityLoader(true);
  
    const item = {
      productId: _id,
      storeId,
      isSubProduct: false,
      subProductId: "",
      cartQuantity: newQuantity,
      subscribedProduct: subscriptionProduct,
      expressProduct: false,
    };
  
    try {
      // Dispatch the action to add the item to the cart (updating the quantity)
      const response = await dispatch(addToCart(item) as any).unwrap();
      dispatch(setCartUpdated(true));
  
      setItemQuantity(newQuantity);  // Update the item quantity
  
      if (response.cartData) {
        // Successfully updated, stop the loader
        setQuantityLoader(false);
      }
    } catch (error: any) {
      // Handle any error during the update
      console.error("Error updating quantity:", error.message);
      setQuantityLoader(false); // Stop the loader even if there is an error
      toast.error(error.message || "An error occurred while updating quantity.");
    }
  };
  

  const handleUpdateRemove = async () => {
    try {
      await dispatch(
        removeFromCart({
          productId: _id,
          isSubProduct: false,
          subProductId: "",
        }) as any
      ).unwrap();
      setIsProductInCart(false);
      dispatch(setCartUpdated(true));
      setItemQuantity(1);
    } catch (error: any) {
      console.error("Error removing from cart:", error.message);
      toast.error(
        error.message || "An error occurred while removing from cart."
      );
    }
  };

  return (
    <div key={_id} className="lg:w-[21rem] flex">
      {/* Image section */}
      <div className="w-32 h-32 bg-customGrayLight rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={176}
          height={176}
          className="object-cover cursor-pointer"
          onClick={() => handleNavigate(_id)}
        />
      </div>

      {/* Product details */}
      <div className="p-3">
        <div className="flex gap-5">
          <div className="flex items-center mb-1">
            <FaStar className="text-customYellow h-4 w-4" />
            <p className="text-customYellow ml-1 text-sm font-semibold">
              {rating?.toFixed(2)}
            </p>
            <span className="text-gray-400 ml-1">({ratingCount})</span>
          </div>
          {/* Offer badge */}
          <div className="bg-customYellowLight py-[1px] text-customBlueLight px-2 rounded-lg">
            <div className="flex items-center">
              <p className="text-lg font-medium text-customBlueLight">
                {Math.min(Math.round(offer || 0), 999)}% {/* Round the offer */}
              </p>
              <p className="ml-2 text-md mt-1 text-customBlueLight">off</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="h-12 w-48">
          <h3 className="text-md font-semibold mb-2">{title}</h3>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <p className="text-lg font-bold text-gray-800">₹{price}</p>
          {originalPrice && (
            <p className="text-sm line-through text-customRed font-medium">
              ₹{originalPrice}
            </p>
          )}
          {/* Button */}
          {isProductInCart ? (
            <QuantityButton
              buttonSize="lg:w-6 h-9"
              initialQuantity={itemQuantity}
              onRemove={handleUpdateRemove}
              onUpdateQuantity={handleUpdateQuantity}
              quantityLoader={quantityLoader}
            />
          ) : (
            <Button
              width="w-20 md:w-20 lg:w-28"
              height="h-8 md:h-10 lg:h-10"
              onClick={handleAddToCart}
            >
              <div className="flex justify-center items-center">
                <p>Add</p>
                {hasSubProducts && <MdArrowForwardIos className="ml-1" />}
              </div>
            </Button>
          )}
        </div>
      </div>
      {/* Right Sidebar for Customization */}
      <RightSidebar
        isVisible={isSidebarVisible}
        onClose={closeSidebar}
        title="Customize"
      >
        {shouldFetchSubProducts && (
          <Customize
            productId={_id}
            storeId={storeId}
            subscribedProduct={subscriptionProduct}
            expressProduct={express}
          />
        )}
      </RightSidebar>
    </div>
  );
};

export default ProductCardHorizondal;
