import OmniAural, { useOmniAural } from 'omniaural'
import React, { useRef } from 'react'
import { BackButton, TextInput } from '../../components'
import { storageUpdateToPodcastAppBoostAmount, storageUpdateToPodcastAppStreamingAmount, storageUpdateToPodcastBoostAmount, storageUpdateToPodcastStreamingAmount } from '../../lib/storage'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const Settings = ({ hideContainer, setCurrentPage }: Props) => {
  const [settings] = useOmniAural('settings')
  const toPodcastBoostAmountRef = useRef<HTMLInputElement>(null)
  const toPodcastStreamingAmountRef = useRef<HTMLInputElement>(null)
  const toPodcastAppBoostAmountRef = useRef<HTMLInputElement>(null)
  const toPodcastAppStreamingAmountRef = useRef<HTMLInputElement>(null)

  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  const handleSetPodcastBoostAmount = () => {
    const val = parseInt(toPodcastBoostAmountRef?.current?.value as string, 10)
    OmniAural.settingsPaymentsToPodcastBoostAmountSet(val)
    storageUpdateToPodcastBoostAmount(val)
  }

  const handleSetPodcastStreamingAmount = () => {
    const val = parseInt(toPodcastStreamingAmountRef?.current?.value as string, 10)
    OmniAural.settingsPaymentsToPodcastStreamingAmountSet(val)
    storageUpdateToPodcastStreamingAmount(val)
  }

  const handleSetPodcastAppBoostAmount = () => {
    const val = parseInt(toPodcastAppBoostAmountRef?.current?.value as string, 10)
    OmniAural.settingsPaymentsToPodcastAppBoostAmountSet(val)
    storageUpdateToPodcastAppBoostAmount(val)
  }

  const handleSetPodcastAppStreamingAmount = () => {
    const val = parseInt(toPodcastAppStreamingAmountRef?.current?.value as string, 10)
    OmniAural.settingsPaymentsToPodcastAppStreamingAmountSet(val)
    storageUpdateToPodcastAppStreamingAmount(val)
  }

  const wrapperClassName = `settings container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <h1>Settings</h1>
      <h2>To Podcast</h2>
      <TextInput defaultValue={settings.payments.toPodcast.boostAmount} label='Boost amount in satoshis' onBlur={handleSetPodcastBoostAmount} ref={toPodcastBoostAmountRef} type='number' />
      <TextInput defaultValue={settings.payments.toPodcast.streamingAmount} label='Stream amount per minute in satoshis' onBlur={handleSetPodcastStreamingAmount} ref={toPodcastStreamingAmountRef} type='number' />
      <hr />
      <h2>To Podcast App</h2>
      <TextInput defaultValue={settings.payments.toPodcastApp.boostAmount} label='Boost amount in satoshis' onBlur={handleSetPodcastAppBoostAmount} ref={toPodcastAppBoostAmountRef} type='number' />
      <TextInput defaultValue={settings.payments.toPodcastApp.streamingAmount} label='Stream amount per minute in satoshis' onBlur={handleSetPodcastAppStreamingAmount} ref={toPodcastAppStreamingAmountRef} type='number' />
    </div>
  )
}
