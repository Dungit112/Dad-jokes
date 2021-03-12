import { takeLatest } from 'redux-saga/effects';
import { fetchJokes } from '../components/jokeList/JokeListSlice';
import { fetchJokesHandle } from './saga';

export default function* rootSaga() {
  yield takeLatest(fetchJokes ,fetchJokesHandle)
}
