import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const categoryApi = {
  getAllCategories: async () => {
    try {
      const response = await api.get(ENDPOINTS.CATEGORY.GET_ALL);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch categories:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getPopularCategories: async () => {
    try {
      const response = await api.get(ENDPOINTS.CATEGORY.GET_POPULAR);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch popular categories:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};