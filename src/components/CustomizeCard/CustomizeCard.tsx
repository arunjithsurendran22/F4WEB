"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Button from "../ui/Buttons/Button";
import QuantityButton from "../ui/Buttons/QuantityButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import { RootState } from "@/store";
import { showLoginToast } from "@/utils/toastUtils";

interface CustomizeCardProps {
  _id: string | undefined;
  mainProduct?: string | undefined;
  imageSrc: string;
  title: string;
  rating: number;
  ratingCount: number;
  offer: number;
  price: number;
  originalPrice?: number;
  storeId?: string;
  subscribedProduct?: boolean;
  expressProduct?: boolean;
}

const CustomizeCard: React.FC<CustomizeCardProps> = ({
  _id,
  mainProduct,
  imageSrc,
  title,
  rating,
  ratingCount,
  offer,
  price,
  originalPrice,
  storeId,
  subscribedProduct,
  expressProduct,
}) => {
  const loggedIn = useSelector((state: RootState) => state.profile.loggedIn);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [quantityLoader, setQuantityLoader] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigate = (id: string | undefined) => {
    if (id) {
      router.push(`/productDetails/${id}`);
    }
  };

  const handleAddToCart = async () => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }
    const item = {
      productId: mainProduct || "",
      storeId,
      isSubProduct: true,
      subProductId: _id,
      cartQuantity: 1,
      subscribedProduct,
      expressProduct,
    };
    try {
      const response = await dispatch(addToCart(item) as any).unwrap();
      if (response.cartData) setIsAddedToCart(true);
    } catch (error: any) {
      console.error("Error adding to cart:", error.message);
      toast.error(error.message || "An error occurred while adding to cart.");
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const responseCart = await dispatch(fetchCartItems() as any).unwrap();
        const productInCart = responseCart.items.find(
          (item: any) => item.product._id === _id
        );
        setIsAddedToCart(!!productInCart);
        setItemQuantity(productInCart ? productInCart.cartQuantity : 1);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    fetchCartData();
  }, [dispatch, _id]);

  const handleUpdateQuantity = async (newQuantity: number) => {
    setQuantityLoader(true);

    try {
      const item = {
        productId: mainProduct || "",
        storeId,
        isSubProduct: true,
        subProductId: _id,
        cartQuantity: newQuantity,
        subscribedProduct,
        expressProduct,
      };

      const response = await dispatch(addToCart(item) as any).unwrap();
      setItemQuantity(newQuantity);
      dispatch(setCartUpdated(true));

      if (response.cartData) {
        setQuantityLoader(false);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.");
      setQuantityLoader(false);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await dispatch(
        removeFromCart({
          productId: mainProduct || "",
          isSubProduct: true,
          subProductId: _id,
        }) as any
      ).unwrap();
      setIsAddedToCart(false);
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
    <div key={_id}>
      <div className="w-[20rem] flex">
        <div className="w-24 h-24 bg-customGrayLight rounded-xl overflow-hidden flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={96}
            height={96}
            className="object-cover cursor-pointer"
            onClick={() => handleNavigate(mainProduct)}
          />
        </div>
        <div className="p-2">
          <div className="flex gap-3">
            <div className="flex items-center mb-1">
              <FaStar className="text-customYellow h-3 w-3" />
              <p className="text-customYellow ml-1 text-xs font-semibold">
                {rating}
              </p>
              <span className="text-gray-400 ml-1 text-xs">
                ({ratingCount})
              </span>
            </div>
            <div className="bg-customYellowLight py-[1px] text-customBlueLight px-1 rounded-lg">
              <div className="flex items-center">
                <p className="text-sm font-medium text-customBlueLight">
                  {offer}%
                </p>
                <p className="ml-1 text-xs mt-[1px] text-customBlueLight">
                  off
                </p>
              </div>
            </div>
          </div>
          <div className="h-10 w-40">
            <h3 className="text-sm font-semibold mb-1">{title}</h3>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <p className="text-sm font-bold text-gray-800">{price}</p>
            {originalPrice && (
              <p className="text-xs line-through text-customRed font-medium">
                {originalPrice}
              </p>
            )}
            {!isAddedToCart ? (
              <Button
                width="w-20"
                height="h-8"
                fontSize="text-sm"
                onClick={handleAddToCart}
              >
                Add
              </Button>
            ) : (
              <QuantityButton
                buttonSize="w-3 h-7"
                textSize="text-sm"
                btnSize="text-md"
                initialQuantity={itemQuantity}
                onRemove={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                quantityLoader={quantityLoader}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCard;
