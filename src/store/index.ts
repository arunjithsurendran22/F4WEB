import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import wishListReducer from "./wishListSlice";
import profileReducer from "./profileSlice";
import addressReducer from "./addressSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    filters: filterReducer,
    cart: cartReducer,
    location: locationReducer,
    wishList: wishListReducer,
    profile: profileReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
