setInterval(async () => {
  const v4vData = parseV4VHiddenElement()
  await chrome.storage.local.set({ v4vData })
}, 5000)

const parseV4VHiddenElement = () => {
  let parsedItem = null

  try {
    const el = document.querySelector('.v4v-hidden-element')
    if (el) {
      const isPlaying = el.getAttribute('data-v4v-is-playing') === 'true'
      const playbackPosition = parseInt(el.getAttribute('data-v4v-current-playback-position'), 10) || 0
      const podcastIndexId = parseInt(el.getAttribute('data-v4v-podcast-index-id'), 10) || null
      const podcastTitle = el.getAttribute('data-v4v-podcast-title') || 'Untitled Podcast'
      const episodeTitle = el.getAttribute('data-v4v-episode-title') || 'Untitled Episode'
      const valueTag = JSON.parse(el.getAttribute('data-v4v-value'))

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

  return parsedItem
}
