import React from "react";
import Button from "@/components/ui/Buttons/Button";
import Image from "next/image";
import { IoMdCheckbox } from "react-icons/io";
import { subscriptionApi } from "@/services/subscriptionService";
import { initiatePayment } from "@/utils/razorpay";
import toast from "react-hot-toast";


interface SubscriptionCardProps {
  plan: {
    _id: string;
    title: string;
    description: string;
    mrp: number;
    sellingPrice: number;
    durationDays: number;
    products: {
      name: string; // Product name
      allowedQuantity: number; // Allowed quantity
      unit: string;
      thumbnail: string
    }[];
    subscribedPlan: boolean;
    endDate: string | null
    // Add any other properties from the response here
  },
  index: number
}

// Calculate expiration date based on durationDays
const calculateExpirationDate = (endDate: string) => {
  const expirationDate = new Date(endDate);
  return expirationDate.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
};

const subscribe = async (_id: string) => {
  try {
    const paymentData = {
      planId: _id
  }
    const response = await subscriptionApi.createPayment(paymentData)

    // Extract paymentOrderDetails
    const { subscriptionOrderDetails } = response.data;

    // Call Razorpay payment initiation
    const responsePayment = await initiatePayment({
      key: subscriptionOrderDetails.key_id, // Razorpay key
      amount: subscriptionOrderDetails.amount_due, // Amount to pay
      currency: subscriptionOrderDetails.currency,
      name: "F4Fish", // Name from the notes
      description: "Your purchase description", // Set a description
      order_id: subscriptionOrderDetails.id, // Use order_id obtained from your server
      customerName: subscriptionOrderDetails.notes.name,
      customerEmail: subscriptionOrderDetails.notes.email || "", // Use email if available
      customerContact: subscriptionOrderDetails.notes.phone || "", // Use phone if available
    });

    // Payment response should be received here
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      responsePayment;

    // Verify payment
    const verificationResponse = await subscriptionApi.verifyPayment(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      {
        headers: {
          "x-razorpay-signature": razorpay_signature, // Send the Razorpay signature in the header
        },
      }
    );

    console.log("Payment Verification Response:", verificationResponse);

    // Assuming payment verification is successful
    if (verificationResponse.data.subscriptionDetails) {
      toast.success("Success! Subscription activated");
      //window.location.reload() 
      typeof window !== "undefined" ? window.location.reload() : '';
    } else {
      toast.error("Payment verification failed. Please try again.");
    }

  } catch (error: any) {
    console.error("Payment failed:", error.message || error);
    toast.error("Payment failed. Please try again.");
  }
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan, index }) => {
  // Destructure all necessary properties from the plan object
  const {
    _id,
    title,
    description,
    mrp,
    sellingPrice,
    durationDays,
    products,
    subscribedPlan,
    endDate
    // Destructure other properties as needed
  } = plan;

  // Calculate expiration date from current date + durationDays
  const expirationDate = endDate ? calculateExpirationDate(endDate) : null

  // Optional: Destructure product details if needed
  const product = products[0]; // Assuming there is at least one product
  const { name: productName, allowedQuantity: productAllowedQuantity, unit: prodcutUnit, thumbnail: productThumbNail } =
    product;

  return (
    // <div className="relative w-80 h-60 overflow-hidden rounded-lg shadow-lg transition-shadow duration-200">
    //   {/* Image as Background */}
    //   <Image
    //     src="/images/subscriptionImg.png"
    //     alt="Subscription Image"
    //     layout="fill"
    //     objectFit="cover"
    //     className="absolute inset-0 z-0"
    //   />

    //   {/* Overlay Content */}
    //   <div className="absolute inset-0 z-10 p-4 text-white">
    //     <h3 className="text-xl font-semibold mb-2">{title}</h3>
    //     <p className="text-sm mb-4">{description}</p>

    //     {/* Optional: Display product details */}
    //     <p className="flex items-center gap-2 text-sm mb-2"><IoMdCheckbox/>{productName}</p>
    //     <p className="text-sm mb-4">
    //       Quantity: {productAllowedQuantity} Kg
    //     </p>

    //     <div className="mb-2">
    //       <p className="text-red-400 line-through text-xs">MRP: ₹ {mrp}</p>
    //       <p className="text-lg font-semibold">₹ {sellingPrice}</p>
    //     </div>
    //     <Button
    //       width="w-3/4"
    //       borderRadius="rounded-lg"
    //       height="h-10"
    //       backgroundColor="bg-gray-800/80"
    //       textColor="text-white"
    //       fontSize="text-sm"
    //       fontWeight="font-semibold"
    //       onClick={() => console.log("Plan selected:", _id)}
    //     >
    //       Expires on {expirationDate}
    //     </Button>
    //   </div>
    // </div>

    <div className="relative w-80 h-60 overflow-hidden rounded-lg shadow-lg transition-shadow duration-200">
      {/* Image as Background */}
      <Image
        src={index % 2 == 0 ? "/images/subscriptionImg.png" : "/images/subscriptionImg2.png"}
        alt="Subscription Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 p-4 text-white">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {/* <p className="text-sm mb-2">{description}</p> */}

        {/* Product Details with Image */}
        <div className="flex justify-between items-center mb-4">
          {/* Product details */}
          <div className="flex flex-col">
            <p className="flex items-center gap-2 text-sm mb-2">
              <IoMdCheckbox /> {productName}
            </p>
            <p className="text-sm">Quantity: {productAllowedQuantity} Kg</p>
            <div className="mt-2">
              <p className="text-red-400 line-through text-xs">MRP: ₹ {mrp}</p>
              <p className="text-lg font-semibold">₹ {sellingPrice}</p>
            </div>
          </div>

          {/* Image beside product details */}
          <div className="w-16 h-16 flex-shrink-0">
            <Image
              src={productThumbNail}
              alt="Product Image"
              width={100} // You can adjust this size accordingly
              height={100} // You can adjust this size accordingly
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Center Button */}
        <div className="flex justify-center mb-4">
        <Button
            width="w-72"
          borderRadius="rounded-lg"
          height="h-10"
          backgroundColor="bg-gray-800/80"
          textColor="text-white"
          fontSize="text-sm"
          fontWeight="font-semibold"
            onClick={() => subscribedPlan ? "" : subscribe(_id)}
        >
            {subscribedPlan ? `Expires on ${expirationDate}` : "Subscribe"}

        </Button>
      </div>
    </div>
    </div>



  );
};

export default SubscriptionCard;
