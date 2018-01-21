import { FETCH_TRACK_INFO } from '../actions/types';

export default function(state = null, action) {
  //console.log('FETCH_TRACK_INFO reducer');
  switch (action.type) {
    case FETCH_TRACK_INFO:
      return action.payload || false;
    default:
      return state;
  }
}
