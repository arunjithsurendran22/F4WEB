"use client";

import Carousel from "@/components/ui/Carousel/Carousel";
import ImageCard from "@/components/ui/ImageCard/ImageCard";
import Sorry from "@/components/ui/Sorry/Sorry";
import { promocodeApi } from "@/services/promocodeService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BannerTwo: React.FC = () => {
  const router = useRouter();
  const [promocodes, setPromocodes] = useState<any[]>([]);

  useEffect(() => {
    const fetchPromocodes = async () => {
      try {
        const response = await promocodeApi.getAllPromocodes();
        setPromocodes(response.data.promocodes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPromocodes();
  }, []);

  const handleCardClick = async (id: string) => {
    router.push(`/offers?id=${id}`);
  };

  return (
    <div className="p-4">
      {promocodes.length === 0 ? (
        <div>
         
          <p className="text-gray-500 text-center italic  ">No Promocodes Available</p>
        </div>
      ) : (
        <Carousel>
          {promocodes.map((promocode) => (
            <ImageCard
              key={promocode._id}
              src={promocode.bannerImageUrl}
              alt={promocode.title}
              onClick={() => handleCardClick(promocode._id)}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BannerTwo;
