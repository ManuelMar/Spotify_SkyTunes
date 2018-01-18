import { SPOTIFY_TOKENS } from '../actions/types.js';

export default function tokenReducer(state = null, action) {
  switch (action.type) {
    case SPOTIFY_TOKENS:
      console.log('token reducer!!!!');
      return action.payload || false;
    default:
      return state;
  }
}
