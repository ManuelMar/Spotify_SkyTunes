import { combineReducers } from 'redux';
import authReducer from './authReducer';
import nowPlayingReducer from './nowPlayingReducer';
import trackReducer from './trackReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  auth: authReducer,
  nowPlaying: nowPlayingReducer,
  track: trackReducer,
  playlist: playlistReducer
});
