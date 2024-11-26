"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Buttons/Button";
import Image from "next/image";
import { FaStar, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import RightSidebar from "../ui/RightSidebar/RightSidebar";
import toast from "react-hot-toast";
import QuantityButton from "../ui/Buttons/QuantityButton";
import Customize from "../Customize/Customize";
import { favouriteApi } from "@/services/wishListService";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import { setCount } from "@/store/wishListSlice";
import { showLoginToast } from "@/utils/toastUtils";
import { RootState } from "@/store";

interface ProductCardProps {
  _id: string;
  imageSrc: string;
  title: string;
  rating?: number;
  price?: number;
  originalPrice?: number;
  ratingCount?: number;
  hasSubProducts?: boolean;
  subscriptionProduct?: boolean;
  discountPercentage?: number;
  express?: boolean;
  storeId?: string;
  width?: string;
  imgHeight?: string;
  unit?: string;
  quantity?: number;
  stockId?: string | null;
  stock?: number | null
}

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  imageSrc,
  title,
  rating = 4.4,
  price = 258,
  originalPrice = 269,
  ratingCount = 0,
  hasSubProducts = false,
  subscriptionProduct,
  discountPercentage,
  express,
  storeId,
  width = "w-72",
  imgHeight = "h-52",
  unit,
  quantity,
  stockId,
  stock
}) => {
  const loggedIn = useSelector((state: RootState) => state.profile.loggedIn);
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isAddedWish, setIsAddedWish] = useState<boolean>(false);
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

  const handleNavigate = (id: string) => {
    router.push(`/productDetails/${id}`);
  };

  const handleAddToCart = async () => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }

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
        stockId: stockId
      };
      try {
        const response = await dispatch(addToCart(item) as any).unwrap();
        if (response.cartData) {
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
        toast.error(error.message || "An error occurred while adding to cart.");
      }
    }
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
    checkFavoriteStatus();
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
      stockId: stockId
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

  const checkFavoriteStatus = async () => {
    try {
      const response = await favouriteApi.getFavourites({ storeId });
      if (response.status && response.statusCode === 200) {
        const favoriteProducts = response.data.products;
        const isFavorite = favoriteProducts.some(
          (product: any) => product._id === _id
        );
        setIsAddedWish(isFavorite);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleAddToWishList = async () => {
    if (!loggedIn) {
      showLoginToast(loggedIn);
      return;
    }

    try {
      const response = await favouriteApi.changeFavouriteStatus(_id);
      if (response.status && response.statusCode === 200) {
        const isFavourite = response.data.favouriteStatus.isFavourite;
        setIsAddedWish(isFavourite);
        if (isFavourite) {
          toast.success("💖 Item added to your wishlist!", {
            style: {
              background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              fontStyle: "italic",
              borderRadius: "12px",
              padding: "16px 24px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              border: "2px solid #4CAF50",
              transform: "scale(1)",
              transition: "transform 0.2s ease",
            },
            iconTheme: {
              primary: "#4CAF50",
              secondary: "#2E7D32",
            },
            duration: 3000,
          });
        } else {
          toast.success("💔 Item removed from your wishlist!", {
            style: {
              background: "linear-gradient(135deg, #FF5253, #D32F2F)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              fontStyle: "italic",
              borderRadius: "12px",
              padding: "16px 24px",
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              border: "2px solid #FF5252",
              transform: "scale(1)",
              transition: "transform 0.2s ease",
            },
            iconTheme: {
              primary: "#FF5252",
              secondary: "#D32F2F",
            },
            duration: 3000,
          });
        }

        const updatedResponse = await favouriteApi.getFavourites({ storeId });
        if (updatedResponse.status && updatedResponse.data) {
          const productCount = updatedResponse.data.products.length;
          dispatch(setCount(productCount));
        }
      } else {
        if (
          response.statusCode === 400 &&
          response.message.includes("Authorization Error")
        ) {
          toast.error("Please log in to manage your wishlist", {
            duration: 3000,
            icon: "🔒",
          });
        } else {
          throw new Error(response.message || "Failed to update wishlist");
        }
      }
    } catch (error: any) {
      console.error("Error updating wishlist:", error);
      toast.error(
        error.message || "Failed to update wishlist. Please try again."
      );
    }
  };

  const formattedDiscount = (discount: any) => {
    return discount
      ? Number.isInteger(discount)
        ? discount.toFixed(0) // No decimal places
        : discount.toFixed(2) // Round to 2 decimal places
      : "0";
  };

  return (
    <div
      key={_id}
      className={`${width} h-[16rem] md:h-[20rem] rounded-3xl shadow-xl hover:shadow-lg transition-shadow relative bg-white`}
    >
      {/* Offer badge */}
      {discountPercentage && (
        <div className="absolute top-3 left-3 bg-customRed py-[1px] text-white px-2 rounded-lg">
          <div className="flex items-center">
            <p className="text-xs md:text-lg font-medium">
              {formattedDiscount(discountPercentage)}%
            </p>
            <p className="ml-2 text-xs md:text-md mt-1 text-gray-200">OFF</p>
          </div>
        </div>
      )}

      {/* Love icon */}
      <div className="absolute top-3 right-3 bg-white shadow-md  text-white p-[.3rem] rounded-full">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleAddToWishList}
        >
          <FaHeart
            className={`${
              isAddedWish ? "text-customRed3" : "text-customGrayLight2"
            }`}
          />
        </div>
      </div>

      {/* Image section */}
      <div
        className="flex justify-center items-center w-full h-1/2 bg-customGrayLight rounded-t-3xl overflow-hidden cursor-pointer"
        onClick={() => handleNavigate(_id)}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={150}
          height={150}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product details */}
      <div className="h-1/2 p-3 flex flex-col justify-between">
        {/* Star rating section */}
        <div className="flex items-center mb-1">
          <FaStar className="text-customYellow h-4 w-4" />
          <p className="text-customYellow ml-1 text-xs md:text-sm font-semibold">
            {rating.toFixed(2)}
          </p>
          <span className="text-gray-400 ml-1 text-xs md:text-sm ">
            ({ratingCount})
          </span>
        </div>

        {/* Title */}
        <h3 className="h-14 text-xs md:text-lg font-semibold mb-1 whitespace-normal overflow-visible lg:text-[1rem]">
          {title}
        </h3>

        <p className="text-sm text-customBlueLight font-semibold">
          {quantity} {unit}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between space-x-1">
          {!subscriptionProduct && (
            <div className="flex items-center justify-between space-x-1 text-xs md:text-sm">
              <p className="font-bold text-gray-800">₹{price}</p>
              {originalPrice > price && (
                <p className="line-through text-customRed font-medium">
                  ₹{originalPrice}
                </p>
              )}
            </div>
          )}

          {/* Button */}
          {isProductInCart ? (
            <QuantityButton
              buttonSize="lg:w-4"
              btnSize="text-xs md:text-lg"
              textSize="text-xs md:text-lg"
              containerPadding="p-1"
              initialQuantity={itemQuantity}
              onRemove={handleUpdateRemove}
              onUpdateQuantity={handleUpdateQuantity}
              quantityLoader={quantityLoader}
            />
          ) : (
            <Button
              width="w-14 sm:w-14 md:w-20 lg:w-28"
              height="h-7 md:h-10 lg:h-10"
              onClick={handleAddToCart}
            >
              <div className="flex justify-center items-center">
                <p className="text-[10px] md:text-lg xl:text-lg">Add</p>
                {hasSubProducts && (
                  <MdArrowForwardIos className="ml-1 text-[10px]" />
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

export default ProductCard;
