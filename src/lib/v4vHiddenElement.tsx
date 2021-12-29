export const handleV4VHiddenElement = () => {
  const v4vHiddenElementClass = '.v4v-hidden-element'
  const v4vCurrentPlaybackPositionClass = 'data-v4v-current-playback-position'
  const v4vPodcastIndexIdClass = 'data-v4v-podcast-index-id'
  const v4vValueClass = 'data-v4v-value'
  const v4vIsPlayingClass = 'data-v4v-is-playing'
  const v4vPodcastTitleClass = 'data-v4v-podcast-title'
  const v4vEpisodeTitleClass = 'data-v4v-episode-title'

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
      const playbackPositionAttr = el.getAttribute(v4vCurrentPlaybackPositionClass)
      const podcastIndexIdAttr = el.getAttribute(v4vPodcastIndexIdClass)
      const valueTagAttr = el.getAttribute(v4vValueClass)

      const isPlaying = el.getAttribute(v4vIsPlayingClass) === 'true'
      const playbackPosition = playbackPositionAttr ? parseInt(playbackPositionAttr, 10) : 0
      const podcastIndexId = podcastIndexIdAttr ? parseInt(podcastIndexIdAttr, 10) : null
      const podcastTitle = el.getAttribute(v4vPodcastTitleClass) || 'Podcast title not found'
      const episodeTitle = el.getAttribute(v4vEpisodeTitleClass) || 'Episode title not found'
      const valueTag = valueTagAttr ? JSON.parse(valueTagAttr) : null

      parsedItem = {
        episodeTitle,
        isPlaying,
        playbackPosition,
        podcastIndexId,
        podcastTitle,
        valueTag
      }
    }

    handleV4VHiddenElementChanges(el)
  } catch (error) {
    console.log('parseV4VHiddenElement error:')
    console.log(error)
  }

  chrome.storage.local.set({ v4vData: parsedItem })
}
