"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface OrderPaymentProps {
  "subTotal": number,
  "deliveryCharge": number,
  "couponDiscount": number,
  "coinsAmount": number,
  "grandTotal": number,
  "couponCode": string,
  "coinsUsed": number,
  "expressProducts": boolean,
  "orderStatus": string
}

function titleCase(word:string) {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
}


const OrderPaymentDetails: React.FC<OrderPaymentProps> = (
  {
    subTotal,
    deliveryCharge,
    couponDiscount,
    coinsAmount,
    grandTotal,
    couponCode,
    coinsUsed,
    expressProducts,
    orderStatus
  }
) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the expand/collapse
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      {/* Heading Section */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >

        <h1 className="text-lg font-semibold">Payment Details</h1>
        {isExpanded ? (
          <FiChevronUp className="text-xl" />
        ) : (
          <FiChevronDown className="text-xl" />
        )}
      </div>

      {/* Conditionally render the total amount */}
      {isExpanded && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Subtotal </p>
            <h2 className="text-lg font-[600]">₹{subTotal}</h2>
          </div>
          {couponCode ? (
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-customGrayLight2">Promo Code </p>
              <h2 className="text-lg font-[600] text-customBlueLight">{couponCode}</h2>
            </div>
          ) : ''
          }
          {couponDiscount ? (
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-customGrayLight2">Promo Discount </p>
              <h2 className="text-lg font-[600]">{couponDiscount}</h2>
            </div>
          ) : ''
          }
          {coinsAmount ? (
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-customGrayLight2">Coin Discount </p>
              <h2 className="text-lg font-[600]">{coinsAmount}</h2>
            </div>
          ) : ''
          }
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Delivery fee </p>
            <h2 className="text-lg font-[600]">{deliveryCharge}</h2>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-customGrayLight2">Total </p>
            <h2 className="text-lg font-[600]">₹{grandTotal}</h2>
          </div>
        </div>
      )}
      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg text-customGrayLight2">Status </p>
            {orderStatus ?( <p className="text-customBlueLight font-medium">
              Order {titleCase(orderStatus)}
            </p>): ''}
          </div>
          <div className="flex gap-1 items-center">
            <div>
              <h2 className="text-sm font-[600] text-customGrayLight2">
                Need help?
              </h2>
              <p className="text-md font-medium">Enquire</p>
            </div>
            <div className="border rounded-full w-10 h-10 items-center flex justify-center">
              <Image src="/icons/Message.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPaymentDetails;
