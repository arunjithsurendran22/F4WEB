import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const profileApi = {
  // Fetch profile details
  getProfileDetails: async () => {
    try {
      const response = await api.get(ENDPOINTS.PROFILE.GET_PROFILE);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch profile details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Update profile details
  updateProfile: async (profileData:any) => {
    try {
      const response = await api.put(ENDPOINTS.PROFILE.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to update profile details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

   // Update profile details
   getReferrals: async () => {

    try {
      const response = await api.get(ENDPOINTS.PROFILE.GET_REFERRALS);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to get profiles:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
