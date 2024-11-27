// RatingCard.tsx
import React, { useEffect, useState } from "react";
import Carousel from "@/components/ui/Carousel/Carousel";
import RatingCardItem from "@/components/ratingCard/RatingCardItem";
import { ratingData } from "@/constant/data";
import { RatingApiResponse, Rating } from "@/types/rating";
import { ratingApi } from "@/services/ratingService";
import toast from "react-hot-toast";

function RatingCard() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response: RatingApiResponse = await ratingApi.getTestimonials();
        if (response.data) setRatings(response.data?.testimonials);
        setLoading(false);
      } catch (err) {
        //toast.error("Failed to fetch Testimonials. Please try again later.");
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="md:p-14 p-3">
      <Carousel>
        {ratings.map((item) => (
          <RatingCardItem
            key={item._id}
            imageSrc={item.imageUrl}
            ratingCount={item.rating}
            name={item.name}
            description={item.review}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default RatingCard;
