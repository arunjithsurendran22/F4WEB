import React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { subscriptionApi } from "@/services/subscriptionService";

interface SubscriptionCardProps {
  plan: {
    _id: string;
    title: string;
    description: string;
    mrp: number;
    sellingPrice: number;
    discountPercentage: number;
    durationDays: number;
    products: {
      name: string;
      allowedQuantity: number;
      unit: string;
      thumbnail: string;
    }[];
    subscribedPlan: boolean;
    endDate: string | null;
  };
  index: number;
}

const calculateExpirationDate = (endDate: string) => {
  const expirationDate = new Date(endDate);
  return expirationDate.toLocaleDateString("en-GB");
};

const SubscriptionCardGreen: React.FC<SubscriptionCardProps> = ({
  plan,
  index,
}) => {
  const {
    _id,
    title,
    sellingPrice,
    discountPercentage,
    durationDays,
    products,
    subscribedPlan,
    endDate,
  } = plan;

  const router = useRouter();

  const subscribe = async (_id: string) => {
    try {
      const paymentData = { planId: _id, source: "WEB" };
      const response = await subscriptionApi.createPayment(paymentData);
      const { subscriptionOrderDetails } = response.data;
      const url = subscriptionOrderDetails.instrumentResponse.redirectInfo.url;
      router.push(url);
    } catch (error: any) {
      console.error("Payment failed:", error.message || error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const expirationDate = endDate ? calculateExpirationDate(endDate) : null;

  const product = products[0];
  const { allowedQuantity: productAllowedQuantity, unit: productUnit } = product;

  const mainImages = [
    "/card/Buy Primeblue1.png",
    "/card/Buy Primegreen1.png",
    "/card/Buy Primeviolet1.png",
  ];
  const offerIcons = ["/card/blueoffer.svg", "/card/greenoffer.svg", "/card/violetoffer.svg"];
  const deliveryIcons = ["/card/bluebike.svg", "/card/greenbike.svg", "/card/violetbike.svg"];
  const textColors = ["#2cb0a4", "#52abff", "#6516cc"];
  const backgroundColors = ["#138379", "#348de0", "#8324ff"];

  const mainImage = mainImages[index % mainImages.length];
  const offerIcon = offerIcons[index % offerIcons.length];
  const deliveryIcon = deliveryIcons[index % deliveryIcons.length];
  const textColor = textColors[index % textColors.length];
  const backgroundColor = backgroundColors[index % backgroundColors.length];

  return (
    <div className="relative w-64 xl:w-72 mt-10">
  {/* Main Image */}
  <div className="relative">
    <Image
      src={mainImage}
      width={500}
      height={600}
      alt="subscription image"
      className="object-cover w-full h-auto"
    />

    {/* Overlay Content */}
    <div
      className="absolute bottom-0 w-full  p-4"
      style={{ height: "68%" }}
    >
      {/* Title */}
      <p className="text-sm font-bold  text-center mb-5" style={{ color: textColor }}>
        {title}
      </p>

      {/* Offer and Delivery Info */}
      

      {/* Duration and Quantity Info */}
      <div className="flex justify-between mb-4">
        <div
          className="border-2 rounded-lg text-center p-2 w-20"
          style={{ color: textColor, borderColor: textColor }}
        >
          <p className="font-bold text-xl">{durationDays}</p>
          <p className="text-xs">total days</p>
        </div>
        <div
          className="border-2 rounded-lg text-center p-2 w-20"
          style={{ color: textColor, borderColor: textColor }}
        >
          <p className="font-bold text-xl">{productAllowedQuantity}</p>
          <p className="text-xs">total {productUnit}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full mb-4">
        {/* Offer Icon and Text */}
        <div className="flex gap-3 items-center">
          <Image
            src={offerIcon}
            width={40}
            height={40}
            alt="offer icon"
            className="object-contain"
          />
          <p className="text-xs" style={{ color: textColor }}>
            {productAllowedQuantity} {productUnit} included.{" "}
            {discountPercentage}% off
          </p>
        </div>

        {/* Delivery Icon and Text */}
        <div className="flex gap-3 items-center">
          <Image
            src={deliveryIcon}
            width={40}
            height={40}
            alt="delivery icon"
            className="object-contain"
          />
          <p className="text-xs" style={{ color: textColor }}>
            {subscribedPlan
              ? `Valid till ${expirationDate}`
              : "Starting from today!"}
          </p>
        </div>
      </div>

      {/* Centered Price */}
      <div className="flex justify-center mb-4">
        <p className="text-lg font-bold" style={{ color: textColor }}>
          ₹{sellingPrice}
        </p>
      </div>
    </div>
  </div>

  {/* Centered Subscribe Button */}
  <div
    className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2"
    style={{ width: "50%" }}
  >
    <button
      onClick={() => (subscribedPlan ? "" : subscribe(_id))}
      className="w-full py-2 text-xs text-white font-semibold rounded-lg"
      style={{
        backgroundColor: backgroundColor,
        borderColor: textColor,
        borderWidth: "4px",
      }}
    >
      {subscribedPlan ? `Subscribed` : "Subscribe Now"}
    </button>
  </div>
</div>

  );
};

export default SubscriptionCardGreen;
