import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { favouriteApi } from "@/services/wishListService"; 

interface WishListState {
  count: number;
  loading: boolean;
  favourites: any[]; 
}

const initialState: WishListState = {
  count: 0,
  loading: false,
  favourites: [],
};

// Create an async thunk for fetching favourites
export const fetchFavourites = createAsyncThunk(
  "wishList/fetchFavourites",
  async ({storeId}: { storeId: string | undefined | null }) => {
    const response = await favouriteApi.getFavourites({storeId});
    if (response.status && response.data) {
      return response.data.products; 
    } else {
      throw new Error(response.message || "Failed to fetch favourites");
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
      })
      .addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false; // Set loading to false when done
        state.favourites = action.payload; // Set the fetched favourites
        state.count = action.payload.length; // Update the count
      })
      .addCase(fetchFavourites.rejected, (state) => {
        state.loading = false; // Set loading to false on error
      });
  },
});

// Export actions
export const { setCount } = wishListSlice.actions;

// Export the reducer
export default wishListSlice.reducer;