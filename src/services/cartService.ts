import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const cartApi = {
  addToCart: async (item: {
    productId: string | null;
    storeId?: string;
    isSubProduct: boolean;
    subProductId?: string | null;
    cartQuantity: number;
    subscribedProduct?: boolean;
    expressProduct?: boolean;
  }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.ADD_TO_CART, item);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to add item to cart:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getCartItems: async () => {
    try {
      const response = await api.get(ENDPOINTS.CART.GET_CART_ITEMS);
      return response.data; // Assuming the API returns the cart items
    } catch (error: any) {
      console.error(
        "Failed to fetch cart items:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getCartTotal: async () => {
    try {
      const response = await api.get(ENDPOINTS.CART.GET_CART_TOTAL);
      return response.data; // Assuming the API returns the cart items
    } catch (error: any) {
      console.error(
        "Failed to fetch cart GET_CART_TOTAL:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  removeFromCart: async (item: {
    productId: string;
    storeId?: string;
    isSubProduct: boolean;
    subProductId?: string | null
  }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.REMOVE_FROM_CART, item); // Send the item in the request body
      return response.data; // Assuming the API returns a success message
    } catch (error: any) {
      console.error(
        "Failed to remove item from cart:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  applyCoupon: async (couponData: {
    cartId: string;
    storeId?: string;
    couponCode: string;
  }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.APPLY_COUPEN, couponData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to apply coupon:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  applyCoins: async (couponData: {
    cartId: string;
    storeId?: string;
    coins: string;
  }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.APPLY_COINS, couponData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to apply coins:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  removeCoupon: async (couponData: { cartId: string }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.REMOVE_COUPEN, couponData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to REMOVE coupon:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  removeCoins: async (couponData: { cartId: string }) => {
    try {
      const response = await api.post(ENDPOINTS.CART.REMOVE_COINS, couponData);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to REMOVE COINS:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
