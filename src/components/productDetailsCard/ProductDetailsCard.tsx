import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import QuantityButton from "../ui/Buttons/QuantityButton";
import { MdArrowForwardIos } from "react-icons/md";
import Button from "../ui/Buttons/Button";
import toast from "react-hot-toast";
import Customize from "../Customize/Customize";
import { useDispatch } from "react-redux";
import {
  addToCart,
  fetchCartItems,
  removeFromCart,
  setCartUpdated,
} from "@/store/cartSlice";
import TrendingNow from "@/page-components/home/components/trendingNow/TrendingNow";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

interface ProductDetailsCardProps {
  _id: string;
  imageSrc: string;
  discount: number;
  rating: number;
  reviewsCount?: number;
  title: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  hasSubProducts?: boolean;
  images: string[];
  expressProduct?: boolean;
  subscribedProduct?: boolean;
  storeId?: string;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  _id,
  discount,
  rating,
  reviewsCount,
  title,
  description,
  price,
  originalPrice,
  hasSubProducts,
  images,
  expressProduct,
  subscribedProduct,
  storeId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldFetchSubProducts, setShouldFetchSubProducts] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const dispatch = useDispatch();

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToCart = async () => {
    if (hasSubProducts) {
      setShouldFetchSubProducts(true);
    } else {
      const item = {
        productId: _id,
        storeId: storeId,
        isSubProduct: false,
        subProductId: "",
        cartQuantity: 1,
        subscribedProduct,
        expressProduct,
      };

      try {
        const response = await dispatch(addToCart(item) as any);
        //console.log(response)
        if(response.payload && response.payload.cartData){
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

  const handleUpdateQuantity = (newQuantity: number) => {
    const item = {
      productId: _id,
      storeId,
      isSubProduct: false,
      subProductId: "",
      cartQuantity: newQuantity,
      subscribedProduct,
      expressProduct,
    };

    dispatch(addToCart(item) as any).then(() => {
      dispatch(setCartUpdated(true));
      setItemQuantity(newQuantity);
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
    <div className="flex flex-col">
      <div className="lg:flex space-x-6 p-6">
        <div className="w-[35rem] h-[25rem] bg-gradient-to-b from-gray-200 to-gray-400 flex justify-center items-center rounded-lg shadow-lg">
          <div className="relative w-full h-full">
            <Slider {...sliderSettings}>
              {images.map((img, index) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    src={img}
                    alt={title}
                    width={500}
                    height={500}
                    className="rounded-lg object-contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 flex-1 space-y-5">
          <div className="flex gap-5 mb-4">
            <div className="bg-customYellowLight py-[1px] w-24 text-customBlueLight px-2 rounded-lg">
              <div className="flex items-center text-center">
                <span className="text-lg font-medium text-customBlueLight">
                  {discount.toFixed(1)}% Off
                </span>
              </div>
            </div>
            <div className="flex items-center mb-1">
              <FaStar className="text-customYellow h-4 w-4" />
              <p className="ml-1 text-sm font-semibold">{rating.toFixed(2)}</p>
              <span className="text-gray-400 ml-1">({reviewsCount})</span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold mb-2">{title}</h1>

          <div className="relative w-full max-w-[38rem]">
            <p
              className={`text-customGrayLight2 transition-all duration-300 ${
                isExpanded ? "h-auto" : "line-clamp-2"
              }`}
            >
              {isExpanded
                ? description
                : `${description?.substring(0, 100)}...`}
            </p>
            <button
              onClick={toggleDescription}
              className="text-customBlueLight font-semibold absolute bottom-0 right-0 bg-transparent border-none cursor-pointer mt-2"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="flex items-center gap-10 mt-10">
            <p className="text-xl font-bold">₹ {price}</p>
            {originalPrice && (
              <p className="text-xl line-through text-customRed font-semibold">
                ₹ {originalPrice}
              </p>
            )}

            {isProductInCart ? (
              <QuantityButton
                buttonSize="w-6 h-9"
                initialQuantity={itemQuantity}
                onRemove={handleUpdateRemove}
                onUpdateQuantity={handleUpdateQuantity}
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
      </div>
      {shouldFetchSubProducts && (
        <div className="p-5">
          <h1 className="font-semibold text-xl mb-5">Customize</h1>
          <Customize
            productId={_id}
            column={true}
            storeId={storeId}
            subscribedProduct={subscribedProduct}
            expressProduct={expressProduct}
          />
        </div>
      )}
      <TrendingNow />
    </div>
  );
};

export default ProductDetailsCard;