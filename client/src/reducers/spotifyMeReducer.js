import { SPOTIFY_ME_INIT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SPOTIFY_ME_INIT:
      console.log('me reducer!!!!');
      return action.payload || false;
    default:
      return state;
  }
}
