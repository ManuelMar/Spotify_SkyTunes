import { combineReducers } from 'redux';
import authReducer from './authReducer';
import nowPlayingReducer from './nowPlayingReducer';

export default combineReducers({
  auth: authReducer,
  nowPlaying: nowPlayingReducer
});
