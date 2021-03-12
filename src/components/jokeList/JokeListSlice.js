import { createSlice, current } from "@reduxjs/toolkit";
import uuid from 'uuid'
export const jokerSlice = createSlice({
  name: "app",
  initialState: {
    joke: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
  },

  reducers: {
    fetchJokes: () =>{},
    setJokes: (state,action) =>{
      console.log("set",action.payload);
      const { id, joke} = action.payload;
      let arr = new Set(state.joke.map(el => el.joke));
      arr.has(joke) ? console.log('Duplicate') : state.joke.push({id: id, joke: joke, votes: 0}) 
    },
    
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
      window.localStorage.setItem(
        "jokes",
        JSON.stringify([...state.joke])
      );
    },
  },
});
export const {
  increment,
  decrement,
  incrementByAmount,
  addVote,
  downVote,
  sortVote,
  fetchJokes,
  setJokes,
  seenJokes
} = jokerSlice.actions;
export default jokerSlice.reducer;
