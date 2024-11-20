import React from "react";
import Image from "next/image";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div
      className="flex-shrink-0 cursor-pointer rounded-2xl p-2 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%]"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={200}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default ImageCard;
