import axios from 'axios';
import { FETCH_USER, SPOTIFY_TOKENS, SPOTIFY_ME_INIT } from './types';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

// thunk automatically passes on dispatch
export const fetch_user = () => async dispatch => {
  const res = await axios.get('/db/current_user');
  console.log('action data');
  console.log(res.data);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const set_spotify_tokens = (aToken, rToken) => async dispatch => {
  if (aToken) {
    spotifyApi.setAccessToken(aToken);
    //SpotifyAPi.setRefreshToken(rToken);
  }

  return { type: SPOTIFY_TOKENS, payload: { aToken, rToken } };
};

export const get_me = aToken => async dispatch => {
  const me = await spotifyApi.getMe();
  console.log(me);

  return { type: SPOTIFY_ME_INIT, payload: me };
};
