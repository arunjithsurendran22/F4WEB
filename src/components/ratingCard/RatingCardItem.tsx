// RatingCardItem.tsx
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingCardItemProps {
  imageSrc: string;
  ratingCount: number;
  name: string;
  description: string;
}

const RatingCardItem: React.FC<RatingCardItemProps> = ({
  imageSrc,
  ratingCount,
  name,
  description,
}) => {
  // Generate an array of stars based on the ratingCount
  const stars = Array.from({ length: 5 }, (_, index) => index < ratingCount);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-3 w-[400px] h-auto flex flex-col m-5 transition-transform transform hover:scale-105 duration-300">
      {/* Image Section */}
      <div className="flex items-center mb-4">
        <Image
          src={imageSrc}
          alt="User"
          className="rounded-full"
          width={60}
          height={60}
        />
      </div>

      {/* Name and Rating */}
      <div className="flex justify-between items-center mb-3 gap-2">
        <h3 className="text-xs md:text-lg font-semibold">{name}</h3>
        <div className="flex">
          {stars.map((filled, index) => (
            <FaStar
              key={index}
              className={`text-xs md:text-xl ${
                filled ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-customGrayLight2 text-xs md:text-sm h-24 whitespace-normal overflow-visible">
        {description}
      </p>
    </div>
  );
};

export default RatingCardItem;
