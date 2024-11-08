import { ENDPOINTS } from "@/api/apiConfiguration";
import api from "@/api/axios";

export const newsletterApi = {
  subscribe: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post<{ success: boolean; message: string }>(
        ENDPOINTS.NEWSLETTER.SUBSCRIBE,
        { email } 
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to subscribe to newsletter:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
