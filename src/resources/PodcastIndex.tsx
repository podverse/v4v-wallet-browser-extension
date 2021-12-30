const baseUrl = 'https://api.podcastindex.org/api/1.0'
const episodes = 'episodes'
const podcasts = 'podcasts'

export const PodcastIndex = {
  api: {
    episodes: {
      byFeedId: `${baseUrl}/${episodes}/byfeedid`
    },
    podcasts: {
      byFeedId: `${baseUrl}/${podcasts}/byfeedid`
    }
  }
}
