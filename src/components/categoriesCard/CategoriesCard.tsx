import React from 'react';
import Image from 'next/image';

interface CategoriesCardProps {
  imageSrc: string;
  title: string;
}

const CategoriesCard: React.FC<CategoriesCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-52 w-52 rounded-xl overflow-hidden  bg-customGrayLight  hover:shadow-xl hover:cursor-pointer">
      <div className="flex flex-col items-center justify-center h-full w-full ">
        <Image
          src={imageSrc}
          alt={title}
          width={80} // Width in pixels
          height={80} // Height in pixels
          className="rounded-full object-contain" // You can apply the same styling as before
        />
        <div className="text-center">
          <h3 className="text-md font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
