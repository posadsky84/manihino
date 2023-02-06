import { takeEvery, all, put } from 'redux-saga/effects';
import { API as api } from '../api';
import { GET_RATING_DETAILED, setRatingDetailed } from './rating-reducer';

function* workerGetPlaysDetailed(action) {
  const data = yield api.getPlaysDetailed(action.season, action.gameId).then(response => response.data);
  yield put(setRatingDetailed(action.gameId, data));
}

function* watcherGetPlaysDetailed() {
  yield takeEvery(GET_RATING_DETAILED, workerGetPlaysDetailed);
}

export default function* rootSaga() {
  yield all([
    watcherGetPlaysDetailed(),
  ])
};
