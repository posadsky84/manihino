import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import RatingReducer from './rating-reducer';
import fullStoryReducer from './fullStory-reducer';
import calendarReducer from './calendar-reducer';
import uiReducer from './ui-reducer';
import PlayersReducer from './players-reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  rating: RatingReducer,
  players: PlayersReducer,
  fullStory: fullStoryReducer,
  ui: uiReducer,
  calendar: calendarReducer,
});

const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(rootSaga);

window.store = store;

export default store;
