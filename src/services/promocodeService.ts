import { ENDPOINTS } from "@/api/apiConfiguration";  // Import your API endpoints
import api from "@/api/axios";  // Import your axios instance

export const promocodeApi = {
  // Fetch all promocodes
  getAllPromocodes: async () => {
    try {
      const response = await api.get(ENDPOINTS.PROMOCODE.GET_ALL_PROMOCODE);
      return response.data; // Return the data from the response
    } catch (error: any) {
      console.error(
        "Failed to fetch promocodes:",
        error.response ? error.response.data : error.message
      );
      throw error; // Throw the error to be handled by the calling function
    }
  },

  // Fetch a single promocode by ID
  getSinglePromocode: async (id: string) => {
    try {
      const response = await api.get(ENDPOINTS.PROMOCODE.GET_SINGLE_PROMOCODE(id));
      return response.data; // Return the data from the response
    } catch (error: any) {
      console.error(
        `Failed to fetch promocode with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      throw error; // Throw the error to be handled by the calling function
    }
  },
};
