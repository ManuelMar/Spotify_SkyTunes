import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tokenReducer from './tokenReducer';
import spotifyMeReducer from './spotifyMeReducer';

export default combineReducers({
  auth: authReducer,
  tokens: tokenReducer,
  me: spotifyMeReducer
});
