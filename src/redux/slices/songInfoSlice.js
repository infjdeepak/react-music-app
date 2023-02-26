//redux
import { createSlice } from "@reduxjs/toolkit";

const songInfoSlice = createSlice({
  name: "songInfo",
  initialState: {
    isPlaying: false,
    songTimeInfo: {
      currentTime: 0,
      duration: 0,
      percentage: "0%",
    },
  },
  reducers: {
    updateIsPlaying: (state) => {
      return { ...state, isPlaying: !state.isPlaying };
    },
    updateTime: (state, action) => {
      return { ...state, songTimeInfo: action.payload };
    },
  },
});

export const { updateIsPlaying, updateTime } = songInfoSlice.actions;
export default songInfoSlice.reducer;
