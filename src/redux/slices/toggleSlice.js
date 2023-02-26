import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggles",
  initialState: {
    isLibraryActive: false,
  },
  reducers: {
    toggleLibrary: (state) => {
      return { ...state, isLibraryActive: !state.isLibraryActive };
    },
  },
});

export const { toggleLibrary } = toggleSlice.actions;
export default toggleSlice.reducer;
