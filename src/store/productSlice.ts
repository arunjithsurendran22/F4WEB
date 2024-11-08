import { productApi } from "@/services/productService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  thumbnail: string;
  sellingPrice: number;
  mrp: number;
  hasSubProducts: boolean;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filters: {
    category?: string | null;
    priceFrom?: number;
    priceTo?: number;
    rating?: number;
  }) => {
    const response = await productApi.getAllProducts(filters);
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
