import { createSlice, current } from "@reduxjs/toolkit";

export const jokerSlice = createSlice({
  name: "app",
  initialState: {
    joke: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
  },

  reducers: {
    addVote: (state, action) => {
      const idvote = action.payload;
      console.log(current(state));
      state.joke.map((el) => (el.id === idvote ? (el.votes += 1) : null));
    },
    downVote: (state, action) => {
      const idvote = action.payload;
      console.log(current(state));
      state.joke.map((el) => (el.id === idvote ? (el.votes -= 1) : null));
    },
    sortVote: (state) => {
      state.joke.sort((a, b) => b.votes - a.votes);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  addVote,
  downVote,
  sortVote,
} = jokerSlice.actions;
export const selectValue = (state) => state.app.joke;
export default jokerSlice.reducer;
