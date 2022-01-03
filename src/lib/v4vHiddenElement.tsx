export const handleV4VHiddenElement = () => {
  const v4vHiddenElementAttr = '.v4v-hidden-element'
  const v4vCurrentPlaybackPositionAttr = 'data-v4v-current-playback-position'
  const v4vPodcastIndexIdAttr = 'data-v4v-podcast-index-id'
  const v4vEpisodeEnclosureUrlAttr = 'data-v4v-episode-enclosure-url'
  const v4vIsPlayingAttr = 'data-v4v-is-playing'
  const v4vUIThemeAttr = 'data-v4v-ui-theme'

  // const handleV4VHiddenElementChanges = (el: any) => {
  //   var observer = new MutationObserver(function (mutations) {
  //     mutations.forEach(function (mutation) {
  //       if (mutation.type === "attributes") {
  //         if (mutation.attributeName === v4vIsPlayingAttr)
  //           console.log("attributes changed", v4vIsPlayingAttr, mutation)
  //       }
  //     });
  //   });

  //   observer.observe(el, {
  //     attributes: true
  //   });
  // }

  let parsedItem = null

  try {
    const el = document.querySelector(v4vHiddenElementAttr)
    if (el) {
      const enclosureUrl = el.getAttribute(v4vEpisodeEnclosureUrlAttr)
      const isPlaying = el.getAttribute(v4vIsPlayingAttr) === 'true'
      const playbackPositionAttr = el.getAttribute(v4vCurrentPlaybackPositionAttr)
      const playbackPosition = playbackPositionAttr ? parseInt(playbackPositionAttr, 10) : 0
      const podcastIndexIdAttr = el.getAttribute(v4vPodcastIndexIdAttr)
      const podcastIndexId = podcastIndexIdAttr ? parseInt(podcastIndexIdAttr, 10) : null
      const uiTheme = el.getAttribute(v4vUIThemeAttr)

      parsedItem = {
        enclosureUrl,
        isPlaying,
        playbackPosition,
        podcastIndexId,
        uiTheme
      }

      // handleV4VHiddenElementChanges(el)
    }
  } catch (error) {
    console.log('parseV4VHiddenElement error:')
    console.log(error)
  }

  chrome.storage.local.set({ v4vHiddenElement: parsedItem })
}
