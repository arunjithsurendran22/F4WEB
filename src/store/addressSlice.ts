// src/store/addressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  latitude: number | null;
  longitude: number | null;
}

const initialState: AddressState = {
  latitude: null,
  longitude: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setCoordinates: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearCoordinates: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

// Export actions
export const { setCoordinates, clearCoordinates } = addressSlice.actions;

// Export the reducer
export default addressSlice.reducer;