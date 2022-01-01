import React, { useEffect, useRef, useState } from 'react'
import { Button, HeaderBar, LoadingSpinner, RecipientTable, TextArea } from '../../components'
import { getPodcastIndexItemInfo } from '../../lib/podcastIndex'
import type { V4VItem } from '../../lib/types'
const { useOmniAural } = require('omniaural')

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const Boost = ({ hideContainer, setCurrentPage }: Props) => {
  const [isBoosting, setIsBoosting] = useState<boolean>(false)
  const [isQuerying, setIsQuerying] = useState<boolean>(true)
  const [v4vItem, setV4VItem] = useState<V4VItem | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [settings] = useOmniAural('settings')

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'v4vHiddenElement'
      ])
      const { v4vHiddenElement } = storageData

      let v4vItemInfo: any = null
      if (v4vHiddenElement?.podcastIndexId) {
        v4vItemInfo = await getPodcastIndexItemInfo(
          v4vHiddenElement.podcastIndexId, v4vHiddenElement.enclosureUrl)
      }

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

  const wrapperClassName = `outer-wrapper ${hideContainer ? 'hide' : ''}`
  const boostButtonAmountText = `${settings.boostAmount} sats`

  return (
    <div className={wrapperClassName}>
      <HeaderBar setCurrentPage={setCurrentPage} showMoreButton />
      <div className='boost container-wrapper'>
        {
          isQuerying && (
            <LoadingSpinner fillSpace size='large' />
          )
        }
        {
          !v4vItem && !isQuerying && (
            <div className='fill-space'>
              <h1>This site is not V4V enabled.</h1>
            </div>
          )
        }
        {
          v4vItem && !isQuerying && (
            <>
              <div className='podcast-info'>
                <div className='podcast-title'>{v4vItem?.podcastTitle}</div>
                <div className='episode-title'>{v4vItem?.episodeTitle}</div>
              </div>
              <div className='boost-wrapper'>
                <Button className='boost-button' isLoading={isBoosting} isSecondary text='Boost' onClick={handleBoost} textBottom={boostButtonAmountText} />
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
