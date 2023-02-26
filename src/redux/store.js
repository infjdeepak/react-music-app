import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./slices/songsSlice";
import songInfoReducer from "./slices/songInfoSlice";
import toggleSlice from "./slices/toggleSlice";
const store = configureStore({
  reducer: {
    songs: songsReducer,
    songInfo: songInfoReducer,
    toggles: toggleSlice,
  },
});

export default store;
