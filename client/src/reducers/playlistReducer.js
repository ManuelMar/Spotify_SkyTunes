import { FETCH_PLAYLIST } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PLAYLIST:
      return action.payload || false;
    default:
      return false;
  }
}
