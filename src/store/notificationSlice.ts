import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { notificationsApi } from "@/services/notificationService";

interface NotificationState {
  count: number;
  loading: boolean;
  notifications: any[]; 
}

const initialState: NotificationState = {
  count: 0,
  loading: false,
  notifications: [],
};

// Create an async thunk for fetching favourites
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({storeId}: { storeId: string | undefined | null }) => {
    const response = await notificationsApi.getAllNotifications();
    if (response && response.data.notifications) {
      return { notifications: response.data.notifications, count: response.data.count}; 
    } else {
      throw new Error(response.message || "Failed to fetch notifications");
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<{notifications: Array<any>, count: number}>) {
      state.count = action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
      })
      .addCase(fetchNotifications.fulfilled, (state, action: any) => {
        state.loading = false; // Set loading to false when done
        state.notifications = action.payload.notifications; // Set the fetched favourites
        state.count = action.payload.count; // Update the count
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false; // Set loading to false on error
      });
  },
});

// Export actions
export const { setCount } = notificationSlice.actions;

// Export the reducer
export default notificationSlice.reducer;