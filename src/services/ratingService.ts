import { ENDPOINTS } from "@/api/apiConfiguration";
import { RatingApiResponse } from "@/types/rating";
import api from "@/api/axios";

export const ratingApi = {
  getTestimonials: async (): Promise<RatingApiResponse> => {
    try {
      const response = await api.get<RatingApiResponse>(
        ENDPOINTS.TESTIMONIAL.GET_TESTIMONNIALS
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch nearby stores:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};