/*
// TODO: Incorporate this helper function in main routes page
module.exports = function(activity){
  const search = await spotifyApi.searchPlaylists(activity, { limit: 4 });
  const vals = _.chain(search.body.playlists.items)
    .map(item => {
      return {
        plId: item.id,
        ownerId: item.owner.id
      };
    })
    .compact()
    .value();

  const trackLists = await Promise.all(
    _.chain(vals)
      .map(async ({ plId, ownerId }) => {
        var tracks = await spotifyApi.getPlaylistTracks(ownerId, plId);
        var uris = _.map(tracks.body.items, trackItem => {
          return { key: trackItem.track.uri, val: 1 };
        });
        return uris;
      })
      .compact()
      .value()
  );

  // flatten track lists
  const flatTrackLists = [].concat.apply([], trackLists);

  const acc = _.chain(flatTrackLists)
    .uniqBy('key')
    .map(item => {
      return {
        key: item.key,
        value: _.chain(flatTrackLists)
          .filter(track => {
            return track.key === item.key;
          })
          .sumBy('val')
          .value()
      };
    })
    .compact()
    .value();

  var vAcc = acc;
  vAcc.sort((a, b) => {
    return parseFloat(a.value) - parseFloat(b.value);
  });

  vAcc.reverse();
  vAcc = vAcc.slice(0, 20);

  const playList = _.map(vAcc, item => {
    return item.key;
  });

  //Creating the playlist and adding the playlist tracks
  const statusCreatePl = await spotifyApi.createPlaylist(
    req.user.profile.spotifyID,
    'Skytunes ' + activity,
    {
      public: false
    }
  );

  const statusAddTracks = await spotifyApi.addTracksToPlaylist(
    req.user.profile.spotifyID,
    statusCreatePl.body.id,
    playList
  );
}
*/
