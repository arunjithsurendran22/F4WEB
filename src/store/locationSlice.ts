import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { storeApi } from "@/services/storeService";
import { toast } from "react-hot-toast";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  storeId: string | null;
  userId: string | null;
  currentAddress: string;
  availableStore: boolean;
  errorMessage: string;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  storeId: null,
  userId: null,
  currentAddress: "",
  availableStore: true,
  errorMessage: "",
};

// Load previous store data from local storage
const loadPreviousStoreData = (): LocationState => {
  const data =
    typeof window !== "undefined"
      ? window.localStorage.getItem("previousStoreData")
      : "";
  return data ? JSON.parse(data) : initialState;
};

const saveStoreData = (storeData: LocationState) => {
  localStorage.setItem("previousStoreData", JSON.stringify(storeData));
};

// Async thunk to fetch current latitude and longitude
export const fetchCurrentLocation = createAsyncThunk(
  "location/fetchCurrentLocation",
  async (_, { dispatch }) => {
    return new Promise<{ latitude: number; longitude: number }>(
      (resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              dispatch(setLatLong({ lat: latitude, lng: longitude }));
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(new Error("Error getting location: " + error.message));
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      }
    );
  }
);

// Async thunk to fetch current location address using Google Maps API
export const fetchCurrentLocationAddress = createAsyncThunk(
  "location/fetchCurrentLocationAddress",
  async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_URL}?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_2}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const fullAddress = data.results[0].formatted_address;
      const addressParts = fullAddress.split(", ");
      const building = addressParts[0];
      const city =
        addressParts.length > 1 ? addressParts[addressParts.length - 3] : "";
      const postalCode =
        addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
      return `${building}, ${city}, ${postalCode}`;
    } else {
      throw new Error("No address found for this location.");
    }
  }
);

export const fetchNearbyStores = createAsyncThunk(
  "location/fetchNearbyStores",
  async (
    { latitude, longitude }: { latitude: number; longitude: number },
    { dispatch, getState }
  ) => {
    try {
      const response = await storeApi.getNearbyStores(latitude, longitude);
      const messageData = "Store fetched successfully";
      if (response.message !== messageData) {
        toast.error(response.message);
      }

      if (response.data && response.data.store) {
        const state = getState() as { location: LocationState };
        const storeData: LocationState = {
          currentAddress: response.data.store.address,
          availableStore: true,
          storeId: response.data.store._id,
          latitude: state.location.latitude,
          longitude: state.location.longitude,
          userId: state.location.userId,
          errorMessage: "",
        };
        saveStoreData(storeData); // Save the data to localStorage
        dispatch(setStoreId(response.data.store._id));
        return storeData;
      } else {
        throw new Error("No stores available near this location!");
      }
    } catch (error) {
      const previousStoreData = loadPreviousStoreData();

      if (previousStoreData.currentAddress) {
        return {
          ...previousStoreData,
          availableStore: false,
          errorMessage: "No stores available near this location!",
        };
      } else {
        throw new Error("No stores available near this location !");
      }
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: loadPreviousStoreData(),
  reducers: {
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setLatLong(state, action: PayloadAction<{ lat: number; lng: number }>) {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lng;
    },
    setStoreId(state, action: PayloadAction<string>) {
      state.storeId = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentLocationAddress.fulfilled, (state, action) => {
        state.currentAddress = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchCurrentLocationAddress.rejected, (state, action) => {
        state.errorMessage = action.error.message || "Unable to fetch address.";
      })
      .addCase(fetchNearbyStores.fulfilled, (state, action) => {
        state.currentAddress = action.payload.currentAddress;
        state.availableStore = action.payload.availableStore;
        state.errorMessage = "";
      })
      .addCase(fetchNearbyStores.rejected, (state, action) => {
        state.availableStore = false;
        state.currentAddress =
          action.error.message || "Unable to fetch nearby stores.";
        state.errorMessage =
          action.error.message || "Unable to fetch nearby stores.";
      });
  },
});

export const { setLatitude, setLongitude, setLatLong, setStoreId, setUserId } =
  locationSlice.actions;

export default locationSlice.reducer;
