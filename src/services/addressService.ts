import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const addressApi = {
  createAddress: async (data: any): Promise<any> => {
    try {
      const response = await api.post<any>(ENDPOINTS.ADDRESS.ADD_ADDRESS, data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to create address:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Get all addresses
  getAllAddresses: async (): Promise<any> => {
    try {
      const response = await api.get<any>(ENDPOINTS.ADDRESS.GET_ALL_ADDRESSES);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch addresses:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Get address by ID
  getAddressById: async (id: string): Promise<any> => {
    try {
      const response = await api.get<any>(ENDPOINTS.ADDRESS.GET_ADDRESS_BY_ID(id));
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to fetch address with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Update address by ID
  updateAddress: async (id: string, data: any): Promise<any> => {
    try {
      const response = await api.put<any>(ENDPOINTS.ADDRESS.UPDATE_ADDRESS(id), data);
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to update address with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Delete address by ID
  deleteAddress: async (id: string): Promise<any> => {
    try {
      const response = await api.delete<any>(ENDPOINTS.ADDRESS.DELETE_ADDRESS(id));
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to delete address with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Set address as primary/default
  setDefaultPrimary: async (id: string): Promise<any> => {
    try {
      const response = await api.put<any>(ENDPOINTS.ADDRESS.SET_DEFAULT_PRIMARY(id));
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to set address with ID ${id} as primary:`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Check address availability
  checkAddressAvailability: async (id: string): Promise<any> => {
    try {
      const response = await api.get<any>(ENDPOINTS.ADDRESS.CHECK_AVAILABILITY(id));
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to check availability of address with ID ${id}:`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
