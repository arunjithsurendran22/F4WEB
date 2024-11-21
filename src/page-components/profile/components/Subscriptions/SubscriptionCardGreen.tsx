import { subscriptionApi } from "@/services/subscriptionService";
import { initiatePayment } from "@/utils/razorpay";
import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


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
    description,
    mrp,
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
      const paymentData = {
        planId: _id,
        source: "WEB",
      };
      const response = await subscriptionApi.createPayment(paymentData);

      const { subscriptionOrderDetails } = response.data;

      const url = subscriptionOrderDetails.instrumentResponse.redirectInfo.url;
      router.push(url);

      // const responsePayment = await initiatePayment({
      //   key: subscriptionOrderDetails.key_id,
      //   amount: subscriptionOrderDetails.amount_due,
      //   currency: subscriptionOrderDetails.currency,
      //   name: "F4Fish",
      //   description: "Your purchase description",
      //   order_id: subscriptionOrderDetails.id,
      //   customerName: subscriptionOrderDetails.notes.name,
      //   customerEmail: subscriptionOrderDetails.notes.email || "",
      //   customerContact: subscriptionOrderDetails.notes.phone || "",
      // });

      // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      //   responsePayment;

      // const verificationResponse = await subscriptionApi.verifyPayment(
      //   {
      //     order_id: razorpay_order_id,
      //     payment_id: razorpay_payment_id,
      //   },
      //   {
      //     headers: {
      //       "x-razorpay-signature": razorpay_signature,
      //     },
      //   }
      // );

      // console.log("Payment Verification Response:", verificationResponse);

      // if (verificationResponse.data.subscriptionDetails) {
      //   toast.success("Success! Subscription activated");
      //   typeof window !== "undefined" ? window.location.reload() : "";
      // } else {
      //   toast.error("Payment verification failed. Please try again.");
      // }
    } catch (error: any) {
      console.error("Payment failed:", error.message || error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const expirationDate = endDate ? calculateExpirationDate(endDate) : null;

  const product = products[0];
  const {
    name: productName,
    allowedQuantity: productAllowedQuantity,
    unit: productUnit,
    thumbnail: productThumbNail,
  } = product;

  const mainImages = [
    "/card/Buy Primeblue.png",
    "/card/Buy Primegreen.png",
    "/card/Buy Primeviolet.png",
  ];
  const offerIcons = [
    "/card/blueoffer.svg",
    "/card/greenoffer.svg",
    "/card/violetoffer.svg",
  ];
  const deliveryIcons = [
    "/card/bluebike.svg",
    "/card/greenbike.svg",
    "/card/violetbike.svg",
  ];

  const textColors = ["#2cb0a4", "#52abff", "#6516cc"];
  const backgroundColors = ["#138379", "#348de0", "#8324ff"];

  const mainImage = mainImages[index % mainImages.length];
  const offerIcon = offerIcons[index % offerIcons.length];
  const deliveryIcon = deliveryIcons[index % deliveryIcons.length];
  const textColor = textColors[index % textColors.length];
  const backgroundColor = backgroundColors[index % backgroundColors.length];

  return (
    <div className="md:w-80 relative">
      <Image
        src={mainImage}
        width={500}
        height={600}
        alt="subscription image"
        className="object-cover"
      />
      <p
        className="absolute top-44 xs:mt-[60px] xxs:mt-[40px] md:mt-[10px] left-1/2 transform -translate-x-1/2 text-xs md:text-sm  "
        style={{ color: textColor, fontWeight: "bold" }}
      >
        {title}
      </p>
      <div className="flex justify-between absolute top-60 xs:mt-[60px] xxs:mt-[20px] md:mt-[10px] left-1/2 transform -translate-x-1/2 w-3/4 px-3 xxs:px-8 xs:px-9 md:px-5">
        <div
          className="border-2 rounded-2xl flex flex-col justify-center items-center p-2 w-20"
          style={{ color: textColor, borderColor: textColor }}
        >
          <p className="font-bold md:text-2xl">{durationDays}</p>
          <p className="text-xs">total days</p>
        </div>
        <div
          className="border-2 rounded-2xl flex flex-col justify-center items-center p-2 w-20"
          style={{ color: textColor, borderColor: textColor }}
        >
          <p className="font-bold md:text-2xl">{productAllowedQuantity}</p>
          <p className="text-xs">total {productUnit}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center absolute top-72 xs:mt-[90px] xxs:mt-[60px] mt-2 md:mt-0 md:top-80 left-1/2 transform -translate-x-1/2 w-3/4 px-6">
        <Image
          src={offerIcon}
          width={60}
          height={60}
          alt="offer icon"
          className="object-cover"
        />
        <p className="text-[12px]" style={{ color: textColor }}>
          {productAllowedQuantity} {productUnit} included. {discountPercentage}{" "}
          % off
        </p>
      </div>
      <div className="flex gap-2 items-center absolute top-80 xs:mt-[120px] xxs:mt-[90px] mt-5 md:mt-0 md:top-[380px] left-1/2 transform -translate-x-1/2 w-3/4 px-6">
        <Image
          src={deliveryIcon}
          width={60}
          height={60}
          alt="delivery icon"
          className="object-cover"
        />
        <p className="text-[10px]" style={{ color: textColor }}>
          {/* {expirationDate || "No expiry yet"} */}
          {subscribedPlan
            ? `Valid till ${expirationDate}`
            : "Starting from today!"}
        </p>
      </div>
      <div className="flex justify-center absolute top-96 xs:mt-[140px] xxs:mt-[90px] md:top-[290px] left-1/2 transform -translate-x-1/2 w-3/4 px-6">
        <p className="text-2xl font-bold" style={{ color: textColor }}>
          ₹{sellingPrice}
        </p>
      </div>
      <button
        onClick={() => (subscribedPlan ? "" : subscribe(_id))}
        className="absolute top-96  xs:mt-[210px] xxs:mt-[135px] mt-12 md:mt-0 md:top-[470px] left-1/2 transform -translate-x-1/2 w-36 p-2 text-xs text-white font-semibold rounded-2xl border-4"
        style={{ backgroundColor: backgroundColor, borderColor: textColor }}
      >
        {subscribedPlan ? `Subscribed` : "subscribe now"}
      </button>
    </div>
  );
};

export default SubscriptionCardGreen;
