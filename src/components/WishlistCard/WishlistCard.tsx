"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Buttons/Button";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CloseButton from "../ui/Buttons/CloseButton";
import QuantityButton from "../ui/Buttons/QuantityButton";
import toast from "react-hot-toast";
import RightSidebar from "../ui/RightSidebar/RightSidebar";
import Customize from "../Customize/Customize";
import { MdArrowForwardIos } from "react-icons/md";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import { useDispatch } from "react-redux";

interface WishlistCardProps {
  _id: string;
  imageSrc: string;
  title: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  ratingCount?: number;
  hasSubProducts?: boolean;
  discountPercentage?: number;
  express?: boolean;
  subscriptionProduct?: boolean;
  storeId?: string;
  onRemove: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  _id,
  imageSrc,
  title,
  rating = 0,
  price = 0,
  originalPrice = 0,
  ratingCount = 0,
  hasSubProducts = false,
  discountPercentage,
  subscriptionProduct,
  express,
  storeId,
  onRemove,
}) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isAddedWish, setIsAddedWish] = useState(false);
  const [shouldFetchSubProducts, setShouldFetchSubProducts] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
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

  const handleNavigate = (id: string) => {
    router.push(`productDetails/${id}`);
  };

  const handleAddToCart = async () => {
    if (hasSubProducts) {
      toggleSidebar();
    } else {
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
        const response = await dispatch(addToCart(item) as any).unwrap();
        if (response.cartData) {
          setIsProductInCart(true);
        }
      } catch (error: any) {
        console.error("Error adding to cart:", error.message);
        toast.error(error.message || "An error occurred while adding to cart.");
      }
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const responseCart = await dispatch(fetchCartItems() as any).unwrap();

        const productInCart = responseCart.items.find(
          (item: any) => item.product._id === _id
        );
        setIsProductInCart(!!productInCart);
        if (productInCart) {
          setItemQuantity(productInCart.cartQuantity);
        } else {
          setItemQuantity(1);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartData();
  }, [dispatch, _id]);

  const handleUpdateQuantity = (newQuantity: number) => {
    const item = {
      productId: _id,
      storeId,
      isSubProduct: false,
      subProductId: "",
      cartQuantity: newQuantity,
      subscribedProduct: subscriptionProduct,
      expressProduct: false,
    };

    dispatch(addToCart(item) as any).then(() => {
      dispatch(setCartUpdated(true));
      setItemQuantity(newQuantity); // Update state with the new quantity
    });
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
    <div
      key={_id}
      className="w-60 rounded-3xl shadow-xl hover:shadow-lg transition-shadow relative cursor-pointer"
    >
      {/* Offer badge */}
      <div className="absolute top-3 left-3 bg-customRed py-[1px] text-white px-2 rounded-lg">
        <div className="flex items-center">
          <p className="text-lg font-medium">{discountPercentage}% </p>
          <p className="ml-2 text-md mt-1 text-gray-200">OFF</p>
        </div>
      </div>

      {/* Image section */}
      <div className="flex justify-center items-center w-full h-44 bg-customGrayLight rounded-t-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={250}
          height={250}
          className="object-cover"
          onClick={() => handleNavigate(_id)}
        />
      </div>

      <div className="absolute top-0 right-0 ">
        <CloseButton onClick={onRemove} />
      </div>

      {/* Product details */}
      <div className="py-4 px-4">
        {/* Star rating section */}
        <div className="flex items-center mb-1">
          <FaStar className="text-customYellow h-4 w-4" />
          <p className="text-customYellow ml-1 text-sm font-semibold">
            {rating.toFixed(2)}
          </p>
          <span className="text-gray-400 ml-1">({ratingCount})</span>
        </div>

        {/* Title */}
        <div className="h-14">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        </div>

        <div className="flex items-center gap-5 space-x-2">
          <p className="text-lg font-bold text-gray-800">₹{price}</p>
          {originalPrice > 0 && (
            <p className="text-sm line-through text-customRed font-medium">
              ₹{originalPrice}
            </p>
          )}
        </div>

        {/* Button */}
        {isProductInCart ? (
          <QuantityButton
            buttonSize="w-full"
            initialQuantity={itemQuantity}
            onRemove={handleUpdateRemove}
            onUpdateQuantity={handleUpdateQuantity}
          />
        ) : (
          <Button width="w-full " height="h-9" onClick={handleAddToCart}>
            <div className="flex justify-center items-center">
              <p>Add</p>
              {hasSubProducts && <MdArrowForwardIos className="ml-1" />}
            </div>
          </Button>
        )}
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

export default WishlistCard;