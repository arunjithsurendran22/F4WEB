import React from "react";
import Image from "next/image";

interface CategoriesCardProps {
  imageSrc: string;
  title: string;
}


const CategoriesCard: React.FC<CategoriesCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="w-32 h-32 md:w-44 md:h-44 flex flex-col items-center justify-center  rounded-xl overflow-hidden  bg-customGrayLight  hover:shadow-xl hover:cursor-pointer">
      <div className="flex flex-col items-center justify-center h-full w-full ">
        <Image
          src={imageSrc}
          alt={title}
          className="rounded-full object-contain"
          width={90}
          height={90}
        />
        <div className="text-center pt-2">
          <h3 className="text-xs md:text-lg font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
