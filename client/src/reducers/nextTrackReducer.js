import { NEXT_TRACK } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case NEXT_TRACK:
      return action.payload || false;
    default:
      return state;
  }
}
