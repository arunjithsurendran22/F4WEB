import { cartApi } from "@/services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CartItem {
  productId: string | null;
  storeId?: string | undefined;
  isSubProduct: boolean;
  subProductId?: string | null;
  cartQuantity: number;
  subscribedProduct?: boolean | undefined;
  expressProduct?: boolean | undefined;
  stockId?: string | null
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  cartTotal?: number;
  grandTotal?: number;
  subTotal?: number;
  couponDiscount?: number;
  coinsAmount: number;
  cartUpdated?: boolean;
  cartId: string | null;
  couponCode: string;
  coins: number;
  itemCount: number;
  itemAddedToCart: boolean;
  expressProducts: boolean;
  subscribedProducts: boolean;
  deliveryCharge: number;
  deliveryChargeExpress: number;
  distanceinKm: number
}

// Initial state for the cart
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  cartTotal: 0,
  grandTotal: 0,
  subTotal: 0,
  couponDiscount: 0,
  coinsAmount: 0,
  cartUpdated: false,
  cartId: null,
  couponCode :'',
  coins: 0,
  itemCount: 0,
  itemAddedToCart: false,
  expressProducts: false,
  subscribedProducts: false,
  deliveryCharge: 0,
  deliveryChargeExpress: 0,
  distanceinKm: 0
};

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await cartApi.getCartItems();
    if (response.status) {
      return {
        items: response.data.cartData?.items || [], // Empty array if cartData is null
        cartId: response.data.cartData?._id || null, // null if cartData is null
        itemCount: response.data.cartData
          ? response.data.cartData.itemCount
          : 0, // Set itemCount to 0 if cartData is null
        expressProducts: response.data.cartData?.expressProducts || false,
        subscribedProducts: response.data.cartData?.subscribedProducts || false,
        couponCode: response.data.cartData?.couponCode || '',
        coins: response.data.cartData?.coins || 0
      };
    } else {
      throw new Error(response.message || "Failed to fetch cart items");
    }
  }
);

// Async thunk to add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item: CartItem, { dispatch }) => {
    const response = await cartApi.addToCart(item);

    if (response.status) {
      // toast.success(response.message);
      await dispatch(fetchCartItems());
      return response.data;
    } else {
      toast.error(response.message || "Failed to add item to cart");
    }

    return response;
  }
);

// Async thunk to fetch cart total
export const fetchCartTotal = createAsyncThunk(
  "cart/fetchCartTotal",
  async () => {
    const response = await cartApi.getCartTotal();
    if (response.status) {
      return {
        cartTotal: response.data.cartTotal,
        grandTotal: response.data.cartTotal.total,
        subTotal: response.data.cartTotal.subTotal,
        couponDiscount: response.data.cartTotal.couponDiscount,
        coinsAmount: response.data.cartTotal.coinsAmount,
      };
    } else {
      throw new Error(response.message || "Failed to fetch cart total");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    item: {
      productId: string;
      storeId?: string;
      isSubProduct: boolean;
      subProductId?: string | null
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await cartApi.removeFromCart(item);
      if (!response.status) {
        throw new Error("Failed to remove item from cart");
      }
      // toast.success("Item removed from cart!");
      await dispatch(fetchCartItems());
      return item.productId;
    } catch (error: any) {
      toast.error("Failed to remove item from cart");
      return rejectWithValue(error.response?.data || "Error removing item");
    }
  }
);

// Async thunk to fetch cart total
export const fetchDeliveryCharge = createAsyncThunk(
  "cart/fetchDeliveryCharge",
  async (filter:{storeId: string, latitude: number, longitude: number, cartAmount: number}) => {
    const response = await cartApi.getDeliveryCharge(filter);
    if (response.status) {
      return {
        deliveryCharge: response.data.charge.deliveryCharge,
        distanceinKm: response.data.charge.distanceinKm,
        deliveryChargeExpress: response.data.charge.deliveryChargeExpress
      };
    } else {
      throw new Error(response.message || "Failed to fetch cart total");
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartUpdated: (state, action) => {
      state.cartUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.cartId = action.payload.cartId;
        state.itemCount = action.payload.itemCount;
        state.expressProducts = action.payload.expressProducts;
        state.subscribedProducts = action.payload.subscribedProducts;
        state.couponCode = action.payload.couponCode;
        state.coins = action.payload.coins;

      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items";
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.itemAddedToCart = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add item to cart";
      })
      .addCase(fetchCartTotal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartTotal.fulfilled, (state, action) => {
        state.loading = false;
        state.cartTotal = action.payload.cartTotal;
        state.grandTotal = action.payload.grandTotal;
        state.subTotal = action.payload.subTotal;
        state.couponDiscount = action.payload.couponDiscount;
        state.coinsAmount = action.payload.coinsAmount;
      })
      .addCase(fetchCartTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart total";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item?.productId && item.productId !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove item from cart";
      })
      .addCase(fetchDeliveryCharge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveryCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryCharge = action.payload.deliveryCharge;
        state.distanceinKm = action.payload.distanceinKm;
        state.deliveryChargeExpress = action.payload.deliveryChargeExpress;
      })
      .addCase(fetchDeliveryCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items";
      })
  },
});

export const { setCartUpdated } = cartSlice.actions;
export default cartSlice.reducer;
