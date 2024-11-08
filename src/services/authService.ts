import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const authApi = {
  login: async (countryCode: string, mobileNumber: string) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        countryCode,
        mobileNumber,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  register: async (
    countryCode: string,
    mobileNumber: string,
    name: string,
    referralCode: string
  ) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
        countryCode,
        mobileNumber,
        name,
        referralCode,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Register failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  checkUserExists: async (countryCode: string, mobileNumber: string) => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.CHECK_USER_EXISTS, {
        countryCode,
        mobileNumber,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Check user exists failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.LOG_OUT);
      return response.data;
    } catch (error: any) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  refreshTokens: async () => {
    try {
      const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKENS);
      return response.data;
    } catch (error: any) {
      console.error(
        "Token refresh failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
