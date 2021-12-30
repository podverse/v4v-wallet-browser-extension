import React, { useEffect, useRef, useState } from 'react'
import { Button, HeaderBar, LoadingSpinner, RecipientTable, TextArea } from '../../components'
import { getPodcastIndexItemInfo } from '../../lib/podcastIndex'
import type { V4VItem } from '../../lib/types'

type Props = {
  setCurrentPage: any
}

export const Boost = ({ setCurrentPage }: Props) => {
  const [isBoosting, setIsBoosting] = useState<boolean>(false)
  const [isQuerying, setIsQuerying] = useState<boolean>(true)
  const [v4vItem, setV4VItem] = useState<V4VItem | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'v4vHiddenElement'
      ])
      const { v4vHiddenElement } = storageData
      const v4vItemInfo = await getPodcastIndexItemInfo(v4vHiddenElement.podcastIndexId, v4vHiddenElement.enclosureUrl)

      // TEMP: setTimeout for dev purposes
      setTimeout(() => {
        setV4VItem(v4vItemInfo)
        setIsQuerying(false)
      }, 1000)
    })()
  }, [])

  const handleBoost = () => {
    setIsBoosting(true)

    setTimeout(() => {
      if (textAreaRef?.current?.value) {
        textAreaRef.current.value = ''
      }
      setIsBoosting(false)
    }, 1000)
  }

  return (
    <div className='outer-wrapper'>
      <HeaderBar showMoreButton />
      <div className='boost container-wrapper'>
        {
          isQuerying && (
            <LoadingSpinner fillSpace size='small' />
          )
        }
        {
          !isQuerying && (
            <>
              <div className='podcast-info'>
                <div className='podcast-title'>{v4vItem?.podcastTitle}</div>
                <div className='episode-title'>{v4vItem?.episodeTitle}</div>
              </div>
              <div className='boost-wrapper'>
                <Button className='boost-button' isLoading={isBoosting} isSecondary text='Boost' onClick={handleBoost} textBottom='500 sats' />
                <TextArea defaultValue='' placeholder='send a boostagram' ref={textAreaRef} />
              </div>
              {/* <Button className='stream-button' isSecondary text='Stream' /> */}
              <RecipientTable valueTag={v4vItem?.valueTags[0]} />
            </>
          )
        }
      </div>
    </div>
  )
}
