import sha1 from 'crypto-js/sha1'
import { Constants } from '../resources'
import { request } from './request'
import type { V4VItem, ValueRecipient, ValueTag } from './types'

const generateAuthorizationHeaders = () => {
  const authKey = '' // Don't push these to the repo!
  const secretKey = '' // Don't push these to the repo!
  const apiHeaderTime = new Date().getTime() / 1000

  const hash = sha1(authKey + secretKey + apiHeaderTime)

  const headers = {
    'X-Auth-Key': authKey,
    'X-Auth-Date': apiHeaderTime,
    'Authorization': hash
  }

  return headers
}

export const getPodcastIndexItemInfo = async (feedId: string, enclosureUrl: string) => {
  // const podcastInfo = await getPodcastIndexPodcastInfo(feedId)
  // const episodesInfo = await getPodcastIndexEpisodeInfo(feedId)
  // const episodeInfo = episodesInfo.items.find((item: any) => item.enclosureUrl === enclosureUrl)
  // return convertPodcastIndexPodcastInfoToV4VInfo(podcastInfo, episodeInfo)

  // Return sampleV4VItem for development purposes only
  return sampleV4VItem
}

const getPodcastIndexPodcastInfo = async (feedId: string) => {
  const options = {
    headers: generateAuthorizationHeaders(),
    method: 'GET',
    query: {
      id: feedId
    },
    url: Constants.PodcastIndex.api.podcasts.byFeedId
  }

  return request(options)
}

/*
  TODO: We will need a PodcastIndex API endpoint that allows us to send
  an episode enclosure url, and get the podcast and episode info in a response.
*/
const getPodcastIndexEpisodeInfo = async (feedId: string) => {
  const options = {
    headers: generateAuthorizationHeaders(),
    method: 'GET',
    query: {
      id: feedId
    },
    url: Constants.PodcastIndex.api.episodes.byFeedId
  }

  return request(options)
}

const convertPodcastIndexPodcastInfoToV4VInfo = (podcastInfo: any, episodeInfo: any) => {
  const podcastIndexValue = episodeInfo.value || podcastInfo.value
  return {
    enclosureUrl: episodeInfo.enclosureUrl,
    episodeTitle: episodeInfo.title,
    podcastIndexEpisodeId: episodeInfo.id,
    podcastIndexFeedId: podcastInfo.feed.id,
    podcastTitle: podcastInfo.feed.title,
    valueTags: convertPodcastIndexValueToV4VItemValueTags(podcastIndexValue)
  } as V4VItem
}

const convertPodcastIndexValueToV4VItemValueTags = (podcastIndexValue: PodcastIndexValue) => {
  const valueTag = {
    method: podcastIndexValue.model.method,
    recipients: convertPodcastIndexValueDestintationsToV4VItemRecipients(podcastIndexValue.destinations),
    suggested: podcastIndexValue.model.suggested,
    type: podcastIndexValue.model.type,
  } as ValueTag

  return [valueTag]
}

const convertPodcastIndexValueDestintationsToV4VItemRecipients
  = (destinations: PodcastIndexValueDestination[]) => {
    return destinations.map((destination: PodcastIndexValueDestination) => {
      const { address, customKey, customValue, fee, name, split, type } = destination
      return {
        address,
        ...(customKey ? { customKey } : {}),
        ...(customValue ? { customValue } : {}),
        ...(fee ? { fee } : {}),
        name,
        split,
        type
      } as ValueRecipient
    })
  }

type PodcastIndexValueDestination = {
  address: string
  customKey: string
  customValue: string
  fee?: boolean
  name: string
  split: number
  type: 'node'
}

type PodcastIndexValue = {
  model: {
    method: 'keysend'
    suggested: number
    type: 'lightning'
  }
  destinations: PodcastIndexValueDestination[]
}

const sampleV4VItem = {
  "enclosureUrl": "https://mp3s.nashownotes.com/PC20-67-2021-12-24-Final.mp3",
  "episodeTitle": "Episode 67: Satoshi Stocking Stuffer",
  "podcastIndexEpisodeId": 5874073954,
  "podcastIndexFeedId": 920666,
  "podcastTitle": "Podcasting 2.0",
  "valueTags": [
    {
      "method": "keysend",
      "recipients": [
        {
          "address": "03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a",
          "name": "Podcastindex.org",
          "split": 59,
          "type": "node"
        },
        {
          "address": "02453e4e93322d60219808c00c2e6d1f1c673420e95b5511a33c40cfb4df5e9148",
          "name": "Dreb Scott (Chapters)",
          "split": 5,
          "type": "node"
        },
        {
          "address": "033868c219bdb51a33560d854d500fe7d3898a1ad9e05dd89d0007e11313588500",
          "customKey": "112111100",
          "customValue": "wal_MB9T45QHGyW",
          "name": "CurioCaster RSS Generator",
          "split": 5,
          "type": "node"
        },
        {
          "address": "02b307fdad2e68d08ba5a59cfc8a0a7ec0ff375291e1082fa22a5524e68608c520",
          "name": "James Cridland",
          "split": 30,
          "type": "node"
        },
        {
          "address": "038399372001f2741d58d6ec4846fccb78daa1a485e69e2eebc5aadba047d35956",
          "name": "Boostagram Monitor",
          "split": 1,
          "type": "node"
        }
      ],
      "suggested": "0.00000005000",
      "type": "lightning"
    }
  ]
}
