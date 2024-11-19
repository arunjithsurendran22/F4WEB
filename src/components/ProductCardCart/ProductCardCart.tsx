import React from "react";
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
  subscribedProduct?: boolean;
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
    return discount
      ? Number.isInteger(discount)
        ? discount.toFixed(0) // No decimal places
        : discount.toFixed(2) // Round to 2 decimal places
      : "0";
  };

  return (
    <div
      key={_id}
      className="flex flex-wrap items-start mb-5 w-72 md:w-96 lg:w-[23rem]"
    >
      {/* Image Container */}
      <div className="w-24 h-24 md:w-[7rem] md:h-[8rem] bg-customGrayLight rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 pt-0">
        {/* Ratings and Offer */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center mb-1 text-sm">
            <FaStar className="text-customYellow h-4 w-4" />
            <p className="text-customYellow ml-1  font-semibold">
              {Math.min(Math.round(rating || 0), 999)}
            </p>
            <span className="text-gray-400 ml-1">({ratingCount})</span>
          </div>
          <div className="bg-customYellowLight py-[1px] text-customBlueLight px-2 rounded-lg">
            <div className="flex items-center">
              <p className="text-sm  font-medium text-customBlueLight">
                {formattedDiscount(offer)}%
              </p>
              <p className="ml-2 text-xs md:text-md mt-1 text-customBlueLight">
                off
              </p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="md:h-12">
          <h3 className="text-xs md:text-md font-semibold mb-1">{title}</h3>
        </div>

        {/* Quantity */}
        <p className="text-xs md:text-sm text-customBlueLight font-semibold">
          {baseQuantity} {unit}
        </p>

        {/* Price and Quantity Button */}
        <div className="flex flex-wrap items-center justify-between space-x-2">
          {!subscribedProduct ? (
            <div className="md:flex md:items-center gap-3">
              <p className="text-md  font-bold text-gray-800">
                ₹{price}
              </p>
              {originalPrice && (
                <p className="text-xs  line-through text-customRed font-medium">
                  ₹{originalPrice}
                </p>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="ml-auto">
            <QuantityButton
              buttonSize="md:w-6 md:h-7"
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
