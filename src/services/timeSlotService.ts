import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const timeSlotApi = {
  getAllSlots: async (storeId: string | null, slotType: string | null) => {
    try {
      const response = await api.get(
        ENDPOINTS.TIME_SLOT.GET_ALL_SLOT(storeId, slotType)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch time slots:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
