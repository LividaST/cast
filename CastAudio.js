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
    var mediainfo = new chrome.cast.media.MediaInfo('https://live.itsbounce.net', 'audio/mp3');
    mediainfo.streamType = 'LIVE'
    mediainfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata()
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
