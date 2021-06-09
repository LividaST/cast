window.__onGCastApiAvailable = function (isAvailable) {
  if (!isAvailable) {
    return false;
  }

  var castContext = cast.framework.CastContext.getInstance();

  castContext.setOptions({
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    receiverApplicationId: '234F3A5F'
  });

  var stateChanged = cast.framework.CastContextEventType.CAST_STATE_CHANGED;
  castContext.addEventListener(stateChanged, async function (event) {
    var castSession = castContext.getCurrentSession();
    var mediainfo = new chrome.cast.media.MediaInfo('hhttps://azuracast.livida.net/radio/8000/aac.m4a', 'audio/aac');
    mediainfo.streamType = 'LIVE'
    mediainfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata()
    const apidata = await fetch('https://livida.net/api/radio').then(res => res.json())
    mediainfo.metadata.metadataType = 3
    mediainfo.metadata.title = apidata.nowplaying.song.name
    mediainfo.metadata.artist = apidata.nowplaying.artist.name
    mediainfo.metadata.albumName = apidata.nowplaying.album.name
    mediainfo.metadata.images = [{
      'url': apidata.nowplaying.album.art
    }]
    var request = new chrome.cast.media.LoadRequest(mediainfo)


    castSession && castSession
      .loadMedia(request)
      .then(function () {
        console.log('Success');
      })
      .catch(function (error) {
        console.log('Error: ' + error);
      });
  });
};
