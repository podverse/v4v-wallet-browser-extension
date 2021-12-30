export const handleV4VHiddenElement = () => {
  const v4vHiddenElementClass = '.v4v-hidden-element'
  const v4vCurrentPlaybackPositionClass = 'data-v4v-current-playback-position'
  const v4vPodcastIndexIdClass = 'data-v4v-podcast-index-id'
  const v4vEpisodeEnclosureUrlClass = 'data-v4v-episode-enclosure-url'
  const v4vIsPlayingClass = 'data-v4v-is-playing'

  const handleV4VHiddenElementChanges = (el: any) => {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes") {
          if (mutation.attributeName === v4vIsPlayingClass)
            console.log("attributes changed", v4vIsPlayingClass, mutation)
        }
      });
    });

    observer.observe(el, {
      attributes: true
    });
  }

  let parsedItem = null

  try {
    const el = document.querySelector(v4vHiddenElementClass)
    if (el) {
      const enclosureUrl = el.getAttribute(v4vEpisodeEnclosureUrlClass)
      const isPlaying = el.getAttribute(v4vIsPlayingClass) === 'true'
      const playbackPositionAttr = el.getAttribute(v4vCurrentPlaybackPositionClass)
      const playbackPosition = playbackPositionAttr ? parseInt(playbackPositionAttr, 10) : 0
      const podcastIndexIdAttr = el.getAttribute(v4vPodcastIndexIdClass)
      const podcastIndexId = podcastIndexIdAttr ? parseInt(podcastIndexIdAttr, 10) : null

      parsedItem = {
        enclosureUrl,
        isPlaying,
        playbackPosition,
        podcastIndexId
      }
    }

    handleV4VHiddenElementChanges(el)
  } catch (error) {
    console.log('parseV4VHiddenElement error:')
    console.log(error)
  }

  chrome.storage.local.set({ v4vHiddenElement: parsedItem })
}
