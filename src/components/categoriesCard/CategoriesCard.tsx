import React from "react";
import Image from "next/image";

interface CategoriesCardProps {
  imageSrc: string;
  title: string;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="w-24 h-24 sm:w-40 sm:h-40 md:w-44 md:h-44 flex flex-col rounded-xl overflow-hidden bg-customGrayLight hover:shadow-xl hover:cursor-pointer">
      <div className="h-[70%] flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={title}
          className="rounded-full object-contain"
          width={90}
          height={90}
        />
      </div>
      <div className="h-[20%] flex items-center justify-center mt-[-10px]">
        <h3 className="text-xs sm:text-sm md:text-lg font-semibold text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoriesCard;
