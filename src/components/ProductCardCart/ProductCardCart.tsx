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
  onRemove,
  handleUpdateQuantity,
}) => {
  return (
    <div key={_id} className="w-[25rem] flex mb-5 ">
      <div className="w-32 h-32 bg-customGrayLight rounded-2xl overflow-hidden flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title}
          width={176}
          height={176}
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex gap-5">
          <div className="flex items-center mb-1">
            <FaStar className="text-customYellow h-4 w-4" />
            <p className="text-customYellow ml-1 text-sm font-semibold">
              {Math.min(Math.round(rating || 0), 999)}% 
            </p>
            <span className="text-gray-400 ml-1">({ratingCount})</span>
          </div>
          <div className="bg-customYellowLight py-[1px] text-customBlueLight px-2 rounded-lg">
            <div className="flex items-center">
              <p className="text-lg font-medium text-customBlueLight">
                {Math.min(Math.round(offer || 0), 999)}% 
              </p>
              <p className="ml-2 text-md mt-1 text-customBlueLight">off</p>
            </div>
          </div>
        </div>
        <div className="h-12 w-48">
          <h3 className="text-md font-semibold mb-2">{title}</h3>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <p className="text-lg font-bold text-gray-800">{price}</p>
          {originalPrice && (
            <p className="text-sm line-through text-customRed font-medium">
              {originalPrice}
            </p>
          )}
          <div className="">
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