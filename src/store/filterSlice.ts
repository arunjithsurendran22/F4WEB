import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string | null;
  priceFrom: number;
  priceTo: number;
  rating: number;
  searchTerm: string;
}

const initialState: FilterState = {
  category: null,
  priceFrom: 0,
  priceTo: 5000,
  rating: 0,
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setPriceFromFilter(state, action: PayloadAction<number>) {
      state.priceFrom = action.payload;
    },
    setPriceToFilter(state, action: PayloadAction<number>) {
      state.priceTo = action.payload;
    },
    setRatingFilter(state, action: PayloadAction<number>) {
      state.rating = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setCategoryFilter,
  setPriceFromFilter,
  setPriceToFilter,
  setRatingFilter,
  setSearchTerm,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
