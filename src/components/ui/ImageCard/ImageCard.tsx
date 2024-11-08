import React from "react";
import Image from "next/image";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div className="flex-shrink-0 relative  cursor-pointer rounded-2xl" onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={200}
        className="rounded-2xl object-cover"
      />
    </div>
  );
};

export default ImageCard;