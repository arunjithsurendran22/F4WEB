import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const productApi = {
  getAllProducts: async ({
    pageNumber,
    pageSize,
    category,
    priceFrom,
    priceTo,
    rating,
    searchTag,
    storeId,
    userId,
  }: {
    pageNumber?: number;
    pageSize?: number;
    category?: string | null;
    priceFrom?: number;
    priceTo?: number;
    rating?: number;
    searchTag?: string;
    storeId?: string;
    userId?: string | null;
  }) => {
    try {
      // Build the query parameters object dynamically
      const params: any = {};

      if (pageNumber !== undefined) params.pageNumber = pageNumber;
      if (pageSize !== undefined) params.pageSize = pageSize;
      if (category !== undefined && category !== null)
        params.category = category;
      if (priceFrom !== undefined) params.priceFrom = priceFrom;
      if (priceTo !== undefined) params.priceTo = priceTo;
      if (rating !== undefined) params.rating = rating;
      if (searchTag !== undefined && searchTag !== null)
        params.searchTag = searchTag;
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;
      if (userId !== undefined && userId !== null) params.userId = userId;

      const response = await api.get(ENDPOINTS.PRODUCT.GET_ALL, { params });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch all products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await api.get(ENDPOINTS.PRODUCT.GET_BY_ID(id));
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch product by ID:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getFlashSaleProducts: async ({ storeId }: { storeId?: string }) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(ENDPOINTS.PRODUCT.GET_FLASH_SALE, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch flash sale products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getRecommendedProducts: async ({ storeId }: { storeId?: string }) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(ENDPOINTS.PRODUCT.GET_RECOMMENDED, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch recommended products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  getExpressProducts: async ({ storeId }: { storeId?: string }) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(ENDPOINTS.PRODUCT.GET_EXPRESS, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch recommended products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  getSubProducts: async (
    mainProductId: string,
    storeId: string | undefined
  ) => {
    try {
      const response = await api.get(ENDPOINTS.PRODUCT.GET_SUB_PRODUCTS, {
        params: { mainProductId, storeId },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subproducts:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getDealsProducts: async ({ storeId }: { storeId?: string }) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(ENDPOINTS.PRODUCT.GET_DEALS, { params });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch deals products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getSubscriptionProducts: async (storeId: string | null) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(
        ENDPOINTS.PRODUCT.GET_SUBSCRIPTION_PRODUCTS,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subscription products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getAllSubscriptionProducts: async (storeId: string | null | undefined) => {
    try {
      const params: any = {};
      if (storeId !== undefined && storeId !== null) params.storeId = storeId;

      const response = await api.get(
        ENDPOINTS.PRODUCT.GET_ALL_SUBSCRIPTION_PRODUCTS,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch subscription products:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
