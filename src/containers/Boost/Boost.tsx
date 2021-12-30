import React, { useEffect } from 'react'
import { HeaderBar } from '../../components'
import { getPodcastIndexItemInfo } from '../../lib/podcastIndex'

type Props = {
  setCurrentPage: any
}

export const Boost = ({ setCurrentPage }: Props) => {
  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'v4vHiddenElement'
      ])
      const { v4vHiddenElement } = storageData
      const v4vItemInfo = await getPodcastIndexItemInfo(v4vHiddenElement.podcastIndexId, v4vHiddenElement.enclosureUrl)
      console.log('Boost v4vItemInfo', v4vItemInfo)
    })()
  }, [])

  return (
    <div className='outer-wrapper'>
      <HeaderBar showMoreButton />
      <div className='container-wrapper'>
        Boost
      </div>
    </div>
  )
}
