import axios from 'axios';
import {
  FETCH_USER,
  FETCH_NOW_PLAYING,
  FETCH_TRACK_INFO,
  FETCH_PLAYLIST
} from './types';
import Spotify from 'spotify-web-api-js';

// TODO: Implement polling every 20 sec or so to get latest now playing track

const spotifyApi = new Spotify();

// thunk automatically passes on dispatch
export const fetch_user = () => async dispatch => {
  const res = await axios.get('/db/current_user');
  //console.log('action data');
  //console.log(res.data);
  spotifyApi.setAccessToken(res.data.accessToken);
  const me = await spotifyApi.getMe();
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetch_now_playing = () => async (dispatch, getState) => {
  //console.log('fetch_now_playing');
  //console.log('getting state in action');
  const resFail = null;

  if (getState().auth) {
    //console.log(getState().auth);
    const aToken = getState().auth.accessToken;
    spotifyApi.setAccessToken(aToken);
    const res = await spotifyApi.getMyCurrentPlayingTrack();
    dispatch({ type: FETCH_NOW_PLAYING, payload: res });
  } else {
    dispatch({ type: FETCH_NOW_PLAYING, payload: resFail });
  }
};

export const fetch_track_info = trackId => async (dispatch, getState) => {
  if (getState().auth) {
    const aToken = getState().auth.accessToken;
    spotifyApi.setAccessToken(aToken);
    const res = await spotifyApi.getTrack(trackId);
    dispatch({ type: FETCH_TRACK_INFO, payload: res });
  } else {
    dispatch({ type: FETCH_TRACK_INFO, payload: null });
  }
};

export const create_playlist = activity => async (dispatch, getState) => {
  if (getState().auth) {
    const aToken = getState().auth.accessToken;
    spotifyApi.setAccessToken(aToken);
    const plId = await axios.post('/api/search', { activity });
    console.log(plId.data);
    const pl = await spotifyApi.getPlaylistTracks(
      getState().auth.profile.spotifyID,
      plId.data.playListId
    );
    console.log(pl);
    const plData = {
      pl: pl,
      name: plId.data.name
    };
    console.log(plData);
    dispatch({ type: FETCH_PLAYLIST, payload: plData });
  } else {
    dispatch({ type: FETCH_PLAYLIST, payload: null });
  }
};
