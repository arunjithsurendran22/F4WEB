import { ENDPOINTS } from "@/api/apiConfiguration";
import { StoreApiResponse } from "@/types/store";
import api from "@/api/axios";

export const storeApi = {
  getNearbyStores: async (
    lat: number,
    lng: number
  ): Promise<StoreApiResponse> => {
    try {
      const response = await api.get<StoreApiResponse>(
        ENDPOINTS.STORE.GET_NEAR_BY_LOCATION(lat, lng)
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
