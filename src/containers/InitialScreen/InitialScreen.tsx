import React from 'react'
import type { V4VData } from "../../types"

type Props = {
  v4vData: V4VData | null
}

export const InitialScreen = ({ v4vData }: Props) => {
  const { episodeTitle, isPlaying, playbackPosition, podcastIndexId, podcastTitle, valueTag } = v4vData || {}

  return (
    <div className='container-wrapper'>
      <div className='podcast-title'>{podcastTitle}</div>
      <div className='episode-title'>{episodeTitle}</div>
    </div>
  )
}
