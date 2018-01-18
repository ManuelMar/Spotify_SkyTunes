import { SPOTIFY_ME } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SPOTIFY_ME:
      console.log('me reducer!!!!');
      return action.payload || false;
    default:
      return state;
  }
}
