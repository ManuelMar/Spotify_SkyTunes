import { FETCH_NOW_PLAYING } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_NOW_PLAYING:
      console.log('NOW PLAYING reducer!!!!');
      //console.log(action);
      return action.payload || false;
    default:
      return state;
  }
}
