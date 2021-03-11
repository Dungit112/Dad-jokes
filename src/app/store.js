import { configureStore } from "@reduxjs/toolkit";
import JokeListSlice from "../JokeListSlice";

export default configureStore({
  reducer: {
    app: JokeListSlice,
  },
});
