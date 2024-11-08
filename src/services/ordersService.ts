import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const ordersApi = {
  // Create payment for an order
  createPayment: async (orderData: any) => {
    try {
      const response = await api.post(
        ENDPOINTS.ORDERS.CREATE_PAYMENT,
        orderData
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to create order payment:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Verify payment of an order
  verifyPayment: async (paymentData: any, headers: any = {}) => {
    try {
      // Combine the default headers with the custom headers
      const response = await api.post(
        ENDPOINTS.ORDERS.VERIFY_PATMENT,
        paymentData,
        {
          headers: {
            ...headers, // Spread any additional headers
          },
        }
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

  // Create a cash on delivery (COD) order
  createCodPayment: async (orderData: any) => {
    try {
      const response = await api.post(
        ENDPOINTS.ORDERS.CREATE_COD_PAYMENT,
        orderData
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to create COD order:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  getMyOrders: async () => {
    try {
      const response = await api.get(ENDPOINTS.ORDERS.GET_MY_ORDERS);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to get orders:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getOrderDetailsDetails: async (orderId: string) => {
    try {
      const response = await api.get(ENDPOINTS.ORDERS.GET_ORDER_DETAILS(orderId));
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to get order:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  
  addRating: async (orderId: string, rating: number, review: string) => {
    // Create the request body according to the specified structure
    const ratingData = {
      orderId,
      rating,
      review,
    };

    try {
      const response = await api.post(
        ENDPOINTS.ORDERS.ADD_RATING,
        ratingData // Pass the structured ratingData directly
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to add rating to order:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
