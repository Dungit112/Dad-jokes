import { configureStore } from "@reduxjs/toolkit";
import JokeListSlice from "../components/jokeList/JokeListSlice";

export default configureStore({
  reducer: {
    app: JokeListSlice,
  },
});
