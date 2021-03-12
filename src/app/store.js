import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootSaga from './middleware';
import JokeListSlice from "../components/jokeList/JokeListSlice";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware,
  
];
export default configureStore({
  middleware,
  reducer: {
    app: JokeListSlice,
  },
});

sagaMiddleware.run(rootSaga);