export const handleV4VHiddenElement = () => {
  let parsedItem = null

  try {
    const el = document.querySelector('.v4v-hidden-element')
    if (el) {
      const playbackPositionAttr = el.getAttribute('data-v4v-current-playback-position')
      const podcastIndexIdAttr = el.getAttribute('data-v4v-podcast-index-id')
      const valueTagAttr = el.getAttribute('data-v4v-value')

      const isPlaying = el.getAttribute('data-v4v-is-playing') === 'true'
      const playbackPosition = playbackPositionAttr ? parseInt(playbackPositionAttr, 10) : 0
      const podcastIndexId = podcastIndexIdAttr ? parseInt(podcastIndexIdAttr, 10) : null
      const podcastTitle = el.getAttribute('data-v4v-podcast-title') || 'Untitled Podcast'
      const episodeTitle = el.getAttribute('data-v4v-episode-title') || 'Untitled Episode'
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
  } catch (error) {
    console.log('parseV4VHiddenElement error:')
    console.log(error)
  }

  chrome.storage.local.set({ v4vData: parsedItem })
}
