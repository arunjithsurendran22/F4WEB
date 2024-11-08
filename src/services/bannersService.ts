import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";
import { Banner, ApiResponse } from "@/types/banner";

export const bannerApi = {
  getBanners: async (): Promise<ApiResponse> => {
    try {
      const response = await api.get<ApiResponse>(ENDPOINTS.BANNER.GET_BANNERS);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch banners:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};