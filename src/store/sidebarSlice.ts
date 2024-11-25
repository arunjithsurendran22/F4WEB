import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  activeSidebar: string | null;
}

const initialState: SidebarState = {
  activeSidebar: null,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction<string>) => {
      state.activeSidebar = action.payload;
    },
    closeSidebar: (state) => {
      state.activeSidebar = null;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
