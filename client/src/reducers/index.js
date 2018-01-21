import { combineReducers } from 'redux';
import authReducer from './authReducer';
import nowPlayingReducer from './nowPlayingReducer';
import trackReducer from './trackReducer';

export default combineReducers({
  auth: authReducer,
  nowPlaying: nowPlayingReducer,
  track: trackReducer
});
