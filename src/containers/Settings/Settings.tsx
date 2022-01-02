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
    if (val >= 0) {
      OmniAural.settingsPaymentsToPodcastBoostAmountSet(val)
      storageUpdateToPodcastBoostAmount(val)
    } else if (toPodcastBoostAmountRef?.current) {
      toPodcastBoostAmountRef.current.value
        = OmniAural.state.settings.payments.toPodcast.boostAmount.value()
    }
  }

  const handleSetPodcastStreamingAmount = () => {
    const val = parseInt(toPodcastStreamingAmountRef?.current?.value as string, 10)
    if (val >= 0) {
      OmniAural.settingsPaymentsToPodcastStreamingAmountSet(val)
      storageUpdateToPodcastStreamingAmount(val)
    } else if (toPodcastStreamingAmountRef?.current) {
      toPodcastStreamingAmountRef.current.value
        = OmniAural.state.settings.payments.toPodcast.streamingAmount.value()
    }
  }

  const handleSetPodcastAppBoostAmount = () => {
    const val = parseInt(toPodcastAppBoostAmountRef?.current?.value as string, 10)
    if (val >= 0) {
      OmniAural.settingsPaymentsToPodcastAppBoostAmountSet(val)
      storageUpdateToPodcastAppBoostAmount(val)
    } else if (toPodcastAppBoostAmountRef?.current) {
      toPodcastAppBoostAmountRef.current.value
        = OmniAural.state.settings.payments.toPodcastApp.boostAmount.value()
    }
  }

  const handleSetPodcastAppStreamingAmount = () => {
    const val = parseInt(toPodcastAppStreamingAmountRef?.current?.value as string, 10)
    if (val >= 0) {
      OmniAural.settingsPaymentsToPodcastAppStreamingAmountSet(val)
      storageUpdateToPodcastAppStreamingAmount(val)
    } else if (toPodcastAppStreamingAmountRef?.current) {
      toPodcastAppStreamingAmountRef.current.value
        = OmniAural.state.settings.payments.toPodcastApp.streamingAmount.value()
    }
  }

  const wrapperClassName = `settings container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <h1>Settings</h1>
      <h2>Amounts (in satoshis)</h2>
      <TextInput defaultValue={settings.payments.toPodcast.boostAmount} label='Boost to podcast' onBlur={handleSetPodcastBoostAmount} ref={toPodcastBoostAmountRef} type='number' />
      {/* <TextInput defaultValue={settings.payments.toPodcast.streamingAmount} label='Stream per minute to podcast' onBlur={handleSetPodcastStreamingAmount} ref={toPodcastStreamingAmountRef} type='number' /> */}
      <TextInput defaultValue={settings.payments.toPodcastApp.boostAmount} label='Boost to podcast app' onBlur={handleSetPodcastAppBoostAmount} ref={toPodcastAppBoostAmountRef} type='number' />
      {/* <TextInput defaultValue={settings.payments.toPodcastApp.streamingAmount} label='Stream per minute to podcast app' onBlur={handleSetPodcastAppStreamingAmount} ref={toPodcastAppStreamingAmountRef} type='number' /> */}
    </div>
  )
}
