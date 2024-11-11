"use client";
import React, { useState, useEffect } from "react";
import Carousel from "@/components/ui/Carousel/Carousel";
import ImageCard from "@/components/ui/ImageCard/ImageCard";
import toast from "react-hot-toast";
import type { ApiResponse, Banner } from "@/types/banner";
import { bannerApi } from "@/services/bannersService";
import { useRouter } from "next/navigation";
import BannerSkeletons from "@/components/Skeletons/BannerSkeletons";
import Sorry from "@/components/ui/Sorry/Sorry";

const Banner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response: ApiResponse = await bannerApi.getBanners();
        if (response.status && response.data) {
          setBanners(response.data);
        } else {
          throw new Error(response.message || "Failed to fetch banners");
        }
      } catch (error) {
        console.error("Failed to load banners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div >
      <Carousel>
        {loading ? (
          <BannerSkeletons />
        ) : banners.length === 0 ? (
          <div className="text-center text-gray-500 ">
            <div>
             
              <h3 className="text-lg font-semibold italic">
                No Banners Available
              </h3>
            </div>
          </div>
        ) : (
          banners.map((banner) => (
            <ImageCard
              key={banner._id}
              src={banner.bannerImage}
              alt={banner.bannerTitle}
              // onClick={() => handleBannerClick(banner._id)}
            />
          ))
        )}
      </Carousel>
    </div>
  );
};

export default Banner;
