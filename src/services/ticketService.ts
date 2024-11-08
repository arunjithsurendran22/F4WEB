import api from "@/api/axios";
import { ENDPOINTS } from "@/api/apiConfiguration";

export const ticketApi = {
  getTicketCategories: async () => {
    try {
      const response = await api.get(ENDPOINTS.TICKET.GET_TICKET_CATEGOY);
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch ticket categories:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  createTicket: async (categoryId: string) => {
    try {
      const response = await api.post(
        ENDPOINTS.TICKET.CREATE_TICKET(categoryId)
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to create ticket:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  getAllTickets: async (searchTag: string) => {
    const params: any = {};
    if (searchTag !== undefined) params.searchTag = searchTag;
    try {
      const response = await api.get(ENDPOINTS.TICKET.GET_ALL_TICKETS, {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to fetch all tickets:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  createChat: async (ticketId: string, messageData: { message: string }) => {
    try {
      const response = await api.post(
        ENDPOINTS.TICKET.CREATE_CHAT(ticketId),
        messageData
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to CREATE_CHAT:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  getChat: async (ticketId: string) => {
    try {
      const response = await api.get(ENDPOINTS.TICKET.GET_CHAT(ticketId));
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to get chat:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
  closeTicket: async (ticketId: string) => {
    try {
      const response = await api.put(ENDPOINTS.TICKET.CLOSE_TICKET(ticketId));
      return response.data;
    } catch (error: any) {
      console.error(
        "Failed to close ticket:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};
