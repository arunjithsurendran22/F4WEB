import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "@/services/profileService";

interface ProfileState {
  profile: {
    name: string;
    countryCode: string;
    mobileNumber: string;
    email: string;
    coinBalance:number
  };
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
}

const initialState: ProfileState = {
  profile: {
    name: "",
    countryCode: "",
    mobileNumber: "",
    email: "",
    coinBalance:0
  },
  loading: false,
  error: null,
  loggedIn: JSON.parse(
    (typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn")
      : "false") || "false"
  ),
};

export const fetchProfileDetails = createAsyncThunk(
  "profile/fetchProfileDetails",
  async () => {
    const response = await profileApi.getProfileDetails();
    return response.data.profileDetails;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});
export const { setLoggedIn } = profileSlice.actions;
export default profileSlice.reducer;
