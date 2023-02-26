// intial data
import chillHop from "../../data.js";
const musicData = chillHop();
//redux
import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: musicData,
    currentSong: musicData[0],
  },
  reducers: {
    changeSong: (state, action) => {
      return { ...state, currentSong: action.payload };
    },
    addActiveToSong: (state, action) => {
      return { ...state, songs: action.payload };
    },
  },
});

export const { changeSong, addActiveToSong } = songsSlice.actions;
export default songsSlice.reducer;
