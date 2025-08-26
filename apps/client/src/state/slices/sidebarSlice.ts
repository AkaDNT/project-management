import { createSlice } from "@reduxjs/toolkit";

interface Sidebar {
  isSidebarCollapsed: boolean;
}

const initialState: Sidebar = {
  isSidebarCollapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebarCollapsed: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { toggleSidebarCollapsed, setSidebarCollapsed } =
  sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
