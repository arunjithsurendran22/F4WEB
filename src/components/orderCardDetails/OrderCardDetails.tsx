import Image from "next/image";
import React from "react";

interface OrderCardDetailsProps {
  imageSrc: string;
  productName: string;
  orderId: string;
  cartQuantity: number,
  unit: string,
  baseQuantity: number
}

const OrderCardDetails: React.FC<OrderCardDetailsProps> = ({
  imageSrc,
  productName,
  orderId,
  cartQuantity,
  unit,
  baseQuantity
}) => {
  return (
    <div className="flex  gap-5 mb-2">
      <div className="bg-customGrayLight w-24 h-24 rounded-xl flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={productName}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col w-44">
        <h1 className="text-md font-semibold text-gray-800">{orderId}</h1>
        <h6 className="text-sm font-[480] text-customGrayLight5 mt-1">
          {productName}
        </h6>
        {
          cartQuantity ? (
            <h6 className="text-md font-[600] text-customGrayLight5 mt-1">
              {cartQuantity * baseQuantity} {unit}
            </h6>
          ) : ''
        }

      </div>
    </div>
  );
};

export default OrderCardDetails;
