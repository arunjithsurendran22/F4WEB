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
  unit?: string;
  quantity?: number;
  stockId?: string | null
  stock?: number | null
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
  unit,
  quantity,
  stockId,
  stock
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
          stockId:stockId

        };

        try {
          const response = await dispatch(addToCart(item) as any);
          if (response.payload && response.payload.cartData) {
            setIsProductInCart(true);
            toast.success("🛒 Item added to your cart!", {
              style: {
                background: "linear-gradient(135deg, #005FA8, #002E59)",
                color: "#fff",
                fontSize: "16px",
                fontStyle: "italic",
                fontWeight: "bold",
                borderRadius: "12px",
                padding: "16px 24px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                border: "2px solid #005FA8",
                transform: "scale(1)",
                transition: "transform 0.2s ease",
              },
              iconTheme: {
                primary: "#00FF00",
                secondary: "#002E59",
              },
              duration: 3000,
            });
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

        const productInCart = responseCart.items.find((item: any) =>
          item.isSubProduct
            ? item.subProduct._id === _id
            : item.product._id === _id
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

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }
    setQuantityLoader(true);
    const item = {
      productId: _id,
      storeId,
      isSubProduct: false,
      subProductId: "",
      cartQuantity: newQuantity,
      subscribedProduct: subscriptionProduct,
      expressProduct: express,
      stockId:stockId

    };

    try {
      const response = await dispatch(addToCart(item) as any).unwrap();
      dispatch(setCartUpdated(true));
      setItemQuantity(newQuantity);
      if (response.cartData) {
        setQuantityLoader(false);
      }
    } catch (error: any) {
      console.error("Error updating quantity:", error.message);
      setQuantityLoader(false);
      toast.error(
        error.message || "An error occurred while updating quantity."
      );
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
      toast.error("🗑️ Item removed from your cart!", {
        style: {
          background: "linear-gradient(135deg, #FF4C4C, #D32F2F)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          fontStyle: "italic",
          borderRadius: "12px",
          padding: "16px 24px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          border: "2px solid #FF4C4C",
          transform: "scale(1)",
          transition: "transform 0.2s ease",
        },
        iconTheme: {
          primary: "#FF0000",
          secondary: "#D32F2F",
        },
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error removing from cart:", error.message);
      toast.error(
        error.message || "An error occurred while removing from cart."
      );
    }
  };

  const formattedDiscount = (discount: any) => {
    return discount
      ? Number.isInteger(discount)
        ? discount.toFixed(0)
        : discount.toFixed(2)
      : "0";
  };

  return (
    <div key={_id} className=" lg:w-[21rem] flex">
      <div className="min-w-[7rem] w-[7rem] h-[8rem] bg-customGrayLight rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer">
        <Image
          src={imageSrc}
          alt={title}
          width={112}
          height={128}
          className="object-cover w-[7rem] h-[8rem]"
          onClick={() => handleNavigate(_id)}
        />
      </div>

      {/* Product details */}
      <div className="p-3 pt-0">
        <div className="flex gap-5">
          <div className="flex items-center mb-1 text-xs">
            <FaStar className="text-customYellow h-4 w-4" />
            <p className="text-customYellow ml-1 text-sm font-semibold">
              {rating?.toFixed(2)}
            </p>
            <span className="text-gray-400 ml-1 ">({ratingCount})</span>
          </div>
          {/* Offer badge */}
          <div className="bg-customYellowLight py-[1px] text-customBlueLight px-2 rounded-lg text-xs md:text-sm">
            <div className="flex items-center">
              <p className=" font-medium text-customBlueLight">
                {formattedDiscount(offer)}%
              </p>
              <p className="ml-2   text-customBlueLight">OFF</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="h-12 w-48 text-xs">
          <h3 className="text-md font-semibold mb-1">{title}</h3>
        </div>

        <p className="text-xs md:text-sm text-customBlueLight font-semibold">
          {quantity} {unit}
        </p>

        <div className="flex items-center justify-between space-x-2 text-xs  w-44 md:w-52">
          <p className=" font-bold text-gray-800">₹{price}</p>
          {originalPrice && (
            <p className=" line-through text-customRed font-medium">
              ₹{originalPrice}
            </p>
          )}
          {/* Button */}
          {isProductInCart ? (
            <QuantityButton
              buttonSize=" w-3 h-8"
              initialQuantity={itemQuantity}
              onRemove={handleUpdateRemove}
              onUpdateQuantity={handleUpdateQuantity}
              quantityLoader={quantityLoader}
            />
          ) : (
            <Button width="w-20" height="h-9" onClick={handleAddToCart}>
              <div className="flex justify-center items-center">
                <p className="text-xs md:text-sm">Add</p>
                {hasSubProducts && (
                  <MdArrowForwardIos className="ml-1 text-xs" />
                )}
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
