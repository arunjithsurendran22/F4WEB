"use client";
import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import TextArea from "../ui/textArea/TextArea";
import Button from "../ui/Buttons/Button";
import { ordersApi } from "@/services/ordersService";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { toast } from "react-hot-toast";

interface ReviewCardProps {
  orderId?: string | null;
  closeModal?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ orderId, closeModal }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReview(e.target.value);

  const handleRatingClick = (index: number) => setRating(index + 1);

  const handleSubmit = async () => {
    if (!rating || !review) {
      setError("Please provide a rating and a review.");
      return;
    }

    try {
      if (orderId) {
        const response = await ordersApi.addRating(orderId, rating, review);
        if(!response.status) toast.error(response.message);
        if (response.data) {
          toast.success(
            "🎉 Thank you for your review! Your feedback helps us improve!",
            {
              style: {
                backgroundColor: "#4CAF50",
                color: "#fff", 
                fontSize: "16px", 
                borderRadius: "8px",
                padding: "12px 20px", 
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
              },
              iconTheme: {
                primary: "#fff", 
                secondary: "#4CAF50", 
              },
              duration: 2000,
            }
          );

          closeModal && closeModal();
          router.push("/");
        }
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-white space-y-4 md:w-96 mx-auto p-4 rounded ">
      <h1 className="text-xl font-semibold mb-4 text-center">Give a Review</h1>

      <div className="flex justify-center mb-4">
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleRatingClick(index)}
              className="cursor-pointer"
            >
              {index < rating ? (
                <FaStar className="text-yellow-500" size={40} />
              ) : (
                <FaRegStar className="text-gray-400" size={40} />
              )}
            </div>
          ))}
        </div>
      </div>

      <TextArea
        label=""
        value={review}
        onChange={handleChange}
        placeHolder="Write your review here..."
        height="h-40"
        backgroundColor="bg-white"
        border="border border-customBlueLight"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        backgroundColor="bg-customBlueLight"
        textColor="text-white"
        width="w-full"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default ReviewCard;
