import { ENDPOINTS } from "@/api/apiConfiguration";
import api from "@/api/axios";

export const subscriptionApi = {
  getAllSubscriptionPlans: async (storeId: string | null): Promise<any> => {
    try {
      const response = await api.get<any>(
        ENDPOINTS.SUBSCRIPTION.GET_ALL_SUBSCRIPTION_PLANS(storeId)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subscription plans:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Create payment for an subscription
  createPayment: async (subscriptionData: any) => {
    try {
      const response = await api.post(
        ENDPOINTS.SUBSCRIPTION.CREATE_PAYMENT,
        subscriptionData
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to create subscription payment:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Verify payment of an order
  verifyPayment: async (id: string) => {
    try {
      // Combine the default headers with the custom headers
      const response = await api.post(
        ENDPOINTS.SUBSCRIPTION.VERIFY_PAYMENT(id),
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to verify order payment:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },


  getActiveSubscriptions: async (storeId: string | null): Promise<any> => {
    try {
      const response = await api.get<any>(
        ENDPOINTS.SUBSCRIPTION.GET_ACTIVE_SUBSCRIPTIONS(storeId)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subscription plans:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getAllSubscriptionPurchases: async (subscriptionId: string): Promise<any> => {
    try {
      const response = await api.get<any>(
        ENDPOINTS.SUBSCRIPTION.GET_PURCHASED_PRODUCTS(subscriptionId)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subscription orders:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
};
