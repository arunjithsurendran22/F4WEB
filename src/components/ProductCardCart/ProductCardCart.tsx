import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import QuantityButton from "../ui/Buttons/QuantityButton";

interface ProductCardProps {
  _id: string;
  imageSrc: string;
  title: string;
  buttonText?: string;
  rating?: number;
  price?: string;
  originalPrice?: string;
  ratingCount?: number;
  offer?: number;
  quantity: number;
  baseQuantity: number;
  unit: string;
  subscribedProduct?: boolean
  onRemove?: () => void;
  handleUpdateQuantity: (newQuantity: number) => void;
}

const ProductCardCart: React.FC<ProductCardProps> = ({
  _id,
  imageSrc,
  title,
  rating = 0,
  price = "₹0",
  originalPrice = "₹0",
  ratingCount = 0,
  offer = 0,
  quantity,
  baseQuantity,
  unit,
  subscribedProduct,
  onRemove,
  handleUpdateQuantity,
}) => {

  const formattedDiscount = (discount: any) => {
    return discount ? Number.isInteger(discount)
      ? discount.toFixed(0) // No decimal places
      : discount.toFixed(2) // Round to 2 decimal places 
      : '0';
  }

  return (
    <div key={_id} className="w-[25rem] flex mb-5 ">
      <div className="w-[7rem] h-[8rem] bg-customGrayLight rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-[7rem] h-[8rem]"
        />
      </div>
      <div className="p-3 pt-0">
        <div className="flex gap-5">
          <div className="flex items-center mb-1">
            <FaStar className="text-customYellow h-4 w-4" />
            <p className="text-customYellow ml-1 text-sm font-semibold">
              {Math.min(Math.round(rating || 0), 999)}
            </p>
            <span className="text-gray-400 ml-1">({ratingCount})</span>
          </div>
          <div className="bg-customYellowLight py-[1px] text-customBlueLight px-2 rounded-lg">
            <div className="flex items-center">
              <p className="text-lg font-medium text-customBlueLight">
                {formattedDiscount(offer)}%
              </p>
              <p className="ml-2 text-md mt-1 text-customBlueLight">off</p>
            </div>
          </div>
        </div>
        <div className="h-12 w-48">
          <h3 className="text-md font-semibold mb-1">{title}</h3>
        </div>
        <div className="">
          <p className="text-sm text-customBlueLight font-semibold">
            {baseQuantity} {unit}
          </p>
        </div>
        <div className="flex items-center justify-between space-x-2">
          {
            !subscribedProduct ? (
              <>
                <p className="text-lg font-bold text-gray-800">₹{price}</p>
                {
                  originalPrice ? (
                    <p className="text-sm line-through text-customRed font-medium">
                      ₹{originalPrice}
                    </p>
                  ) : ''
                }
              </>
            ) : ''
          }
          <div className="ml-auto">
            <QuantityButton
              buttonSize="w-8 h-8"
              textSize="text-lg"
              containerPadding="px-2"
              initialQuantity={quantity}
              onRemove={onRemove}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCart;