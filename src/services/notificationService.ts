import { ENDPOINTS } from "@/api/apiConfiguration";
import api from "@/api/axios";

interface NotificationApiResponse {
  data: Array<any>;
  success: boolean;
  message: string;
}

export const notificationsApi = {
  // Function to get all notifications
  getAllNotifications: async (): Promise<NotificationApiResponse> => {
    try {
      const response = await api.get<NotificationApiResponse>(
        ENDPOINTS.NOTIFICATION.GET_ALL_NOTIFICATION
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch notifications:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Function to update the view status of a notification
  viewNotification: async (id: string): Promise<NotificationApiResponse> => {
    try {
      const response = await api.put<NotificationApiResponse>(
        ENDPOINTS.NOTIFICATION.VIEW_NOTIFICATION(id)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        `Failed to update notification view status for ID: ${id}`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Function to clear all notifications
  clearAllNotifications: async (): Promise<NotificationApiResponse> => {
    try {
      const response = await api.delete<NotificationApiResponse>(
        ENDPOINTS.NOTIFICATION.CLEAR_NOTIFICATION
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to clear all notifications:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
