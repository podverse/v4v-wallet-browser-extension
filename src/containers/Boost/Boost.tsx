import OmniAural, { useOmniAural } from 'omniaural'
import React, { useEffect, useRef, useState } from 'react'
import { Button, HeaderBar, LoadingSpinner, RecipientTable, TextArea } from '../../components'
import { getPodcastAppInfo, getPodcastIndexItemInfo } from '../../lib/podcastIndex'
import { convertPodcastAppInfoToV4VItem, convertValueTagIntoValueTransactions } from '../../lib/v4vHelpers'
import type { V4VItem, V4VPodcastAppInfo, ValueTransaction } from '../../types'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const Boost = ({ hideContainer, setCurrentPage }: Props) => {
  const [isBoosting, setIsBoosting] = useState<boolean>(false)
  const [isQuerying, setIsQuerying] = useState<boolean>(true)
  const [v4vItem, setV4VItem] = useState<V4VItem | null>(null)
  const [v4vPodcastAppInfo, setV4VPodcastAppInfo] = useState<V4VPodcastAppInfo | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isStreaming] = useOmniAural('isStreaming')
  const [settings] = useOmniAural('settings')

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'v4vHiddenElement'
      ])
      const { v4vHiddenElement } = storageData

      let v4vItemInfo: any = null
      let v4vPodcastAppInfo: any = null
      if (v4vHiddenElement?.podcastIndexId) {
        v4vItemInfo = await getPodcastIndexItemInfo(
          v4vHiddenElement.podcastIndexId, v4vHiddenElement.enclosureUrl)
        v4vPodcastAppInfo = await getPodcastAppInfo()
      }

      // TEMP: setTimeout for dev purposes
      setTimeout(() => {
        setV4VItem(v4vItemInfo)
        setV4VPodcastAppInfo(v4vPodcastAppInfo)
        setIsQuerying(false)
      }, 1000)
    })()
  }, [])

  const generateValueTransactions = (action: 'Boost' | 'Streaming', toPodcastAmount: number, toPodcastAppAmount: number) => {
    let transactions = [] as ValueTransaction[]
    const podcastValueTag = v4vItem?.valueTags[0]
    const v4vItemPodcastApp = convertPodcastAppInfoToV4VItem(v4vPodcastAppInfo)
    const podcastAppValueTag = v4vItemPodcastApp?.valueTags[0]
    const roundDownValues = true

    if (podcastValueTag) {
      const podcastTransactions = convertValueTagIntoValueTransactions(
        podcastValueTag,
        v4vItem,
        action,
        toPodcastAmount,
        roundDownValues
      )

      if (podcastTransactions.length > 0) {
        transactions = transactions.concat(podcastTransactions)
      }
    }

    if (podcastAppValueTag) {
      const podcastAppTransactions = convertValueTagIntoValueTransactions(
        podcastAppValueTag,
        v4vItemPodcastApp,
        action,
        toPodcastAppAmount,
        roundDownValues
      )

      if (podcastAppTransactions.length > 0) {
        transactions = transactions.concat(podcastAppTransactions)
      }
    }

    return transactions
  }

  const boostValueTransactions = generateValueTransactions(
    'Boost',
    settings.payments.toPodcast.boostAmount,
    settings.payments.toPodcastApp.boostAmount
  )

  const streamingValueTransactions = generateValueTransactions(
    'Streaming',
    settings.payments.toPodcast.streamingAmount,
    settings.payments.toPodcastApp.streamingAmount
  )

  const handleBoost = () => {
    if (boostValueTransactions?.length) {
      setIsBoosting(true)

      console.log('booooost', boostValueTransactions)
      // TODO: send valueTransactions to LNPay keysend endpoint

      setTimeout(() => {
        if (textAreaRef?.current?.value) {
          textAreaRef.current.value = ''
        }
        setIsBoosting(false)
      }, 1000)
    }
  }

  const handleStreamToggle = async () => {
    const newIsStreaming = !isStreaming
    await chrome.storage.local.set({ 'isStreaming': newIsStreaming })
    OmniAural.isStreamingSet(newIsStreaming)
    newIsStreaming ? chrome.action.setBadgeText({ text: 'On' }) : chrome.action.setBadgeText({ text: '' })
  }

  const wrapperClassName = `outer-wrapper ${hideContainer ? 'hide' : ''}`
  const totalBoostButtonAmount = settings.payments.toPodcast.boostAmount + settings.payments.toPodcastApp.boostAmount
  const boostButtonAmountText = `${totalBoostButtonAmount} sats`
  const totalStreamButtonAmount = settings.payments.toPodcast.streamingAmount + settings.payments.toPodcastApp.streamingAmount
  const streamButtonAmountText = `${totalStreamButtonAmount} sats/min`
  const streamButtonText = isStreaming ? 'Stream on' : 'Stream off'

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
              <div className='stream-wrapper'>
                <Button className='stream-button' isSecondary text={streamButtonText} isStreaming={isStreaming} onClick={handleStreamToggle} textBottom={streamButtonAmountText} />
              </div>
              <div className='boost-wrapper'>
                <Button className='boost-button' isLoading={isBoosting} isSecondary text='Boost' onClick={handleBoost} textBottom={boostButtonAmountText} />
                <TextArea defaultValue='' placeholder='send a boostagram' ref={textAreaRef} />
              </div>
              <hr />
              <RecipientTable
                headerText='Boost Recipients'
                valueTransactions={boostValueTransactions} />
              <hr />
              <RecipientTable
                headerText='Stream Recipients'
                valueTransactions={streamingValueTransactions} />
            </>
          )
        }
      </div>
    </div>
  )
}
