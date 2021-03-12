import axios from 'axios';
import { put } from 'redux-saga/effects';
import { setJokes } from '../components/jokeList/JokeListSlice';
export function* fetchJokesHandle(payload) {
  try {
    let res = yield axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    });
    yield put(setJokes(res.data));
    payload.cbDone(true);
    console.log(payload.cbDone)
  } catch (error) {
    console.log('');
  }
}

// export function* appMiddleware() {
//     yield all([call(handleJokesSaga)]);
//   }
