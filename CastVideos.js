window.__onGCastApiAvailable = function (isAvailable) {
  if (!isAvailable) {
    return false;
  }

  var castContext = cast.framework.CastContext.getInstance();

  castContext.setOptions({
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    receiverApplicationId: '7D4698C0'
  });

  var stateChanged = cast.framework.CastContextEventType.CAST_STATE_CHANGED;
  castContext.addEventListener(stateChanged, async function (event) {
    var castSession = castContext.getCurrentSession();
    var mediainfo = new chrome.cast.media.MediaInfo('https://stream.livida.net', 'audio/mp3');
    mediainfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata()
    const apidata = await fetch('https://api.livida.net/api/radio').then(res => res.json())
    mediainfo.metadata.metadataType = 3
    mediainfo.metadata.title = apidata.data.song.name
    mediainfo.metadata.artist = apidata.data.song.artist
    mediainfo.metadata.images = [{
      'url': apidata.data.song.art
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
