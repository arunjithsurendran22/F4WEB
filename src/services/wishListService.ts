import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const favouriteApi = {
  getFavourites: async ({storeId}: {storeId?: string | null }) => {
    try {
      const params: any = {};

      if (storeId !== undefined && storeId !== null) params.storeId = storeId;


      const response = await api.get(ENDPOINTS.FAVOURITE.GET_FAVOURITES, { params });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch favourite products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  changeFavouriteStatus: async (productId: string) => {
    try {
      const response = await api.post(ENDPOINTS.FAVOURITE.ADD_FAVOURITE, { productId });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to change favourite status:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};