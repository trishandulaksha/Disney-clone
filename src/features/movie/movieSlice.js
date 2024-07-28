import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommend: null,
  newDisney: null,
  original: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.recommend = action.payload.recommend;
      state.trending = action.payload.trending;
      state.original = action.payload.original;
      state.newDisney = action.payload.newDisney;
    },
  },
});

export const { setMovie } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommend;
export const selectTrending = (state) => state.movie.trending;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;

export default movieSlice.reducer;
