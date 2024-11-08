import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  selectedAddressId: string | null;
  triggerAPI: boolean;
}

const initialState: AddressState = {
  selectedAddressId: null,
  triggerAPI: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSelectedAddressId: (state, action: PayloadAction<string | null>) => {
      state.selectedAddressId = action.payload;
    },
    setTriggerAPI: (state, action: PayloadAction<boolean>) => {
      state.triggerAPI = action.payload; 
    },
  },
});

export const { setSelectedAddressId, setTriggerAPI } = addressSlice.actions;
export default addressSlice.reducer;
