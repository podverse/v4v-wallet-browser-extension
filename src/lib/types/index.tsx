
export type V4VHiddenElement = {
  enclosureUrl: string
  isPlaying: boolean
  playbackPosition: number
  podcastIndexId: number | null
}

export type V4VItem = {
  enclosureUrl: string
  episodeTitle: string
  podcastIndexEpisodeId: number | null
  podcastIndexFeedId: number | null
  podcastTitle: string
  valueTags: ValueTags
}

export type ValueRecipient = {
  address: string
  customKey?: string
  customValue?: string
  fee?: boolean
  name: string
  split: number
  type: string // 'node'
}

export type ValueTag = {
  method: string // 'keysend'
  recipients: ValueRecipient[]
  suggested: number
  type: string // 'lightning'
}

export type ValueTags = ValueTag[]
