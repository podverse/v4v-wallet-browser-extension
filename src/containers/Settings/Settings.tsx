import React, { useRef } from 'react'
import { BackButton, TextInput } from '../../components'
import { Constants } from '../../resources'

const OmniAural = require('omniaural')
const { useOmniAural } = OmniAural

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
    const val = toPodcastBoostAmountRef?.current?.value
    // OmniAural.settingsBoostAmountSet(val)
  }

  const handleSetPodcastStreamingAmount = () => {
    const val = toPodcastStreamingAmountRef?.current?.value
    // OmniAural.settingsBoostAmountSet(val)
  }

  const handleSetPodcastAppBoostAmount = () => {
    const val = toPodcastAppBoostAmountRef?.current?.value
    // OmniAural.settingsBoostAmountSet(val)
  }

  const handleSetPodcastAppStreamingAmount = () => {
    const val = toPodcastAppStreamingAmountRef?.current?.value
    // OmniAural.settingsBoostAmountSet(val)
  }

  const wrapperClassName = `settings container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <h1>Settings</h1>
      <h2>To Podcast</h2>
      <TextInput defaultValue={settings.payments.toPodcast.boostAmount} label='Boost amount in satoshis' onBlur={handleSetPodcastBoostAmount} ref={toPodcastBoostAmountRef} />
      <TextInput defaultValue={settings.payments.toPodcast.streamingAmount} label='Stream amount per minute in satoshis' onBlur={handleSetPodcastStreamingAmount} ref={toPodcastStreamingAmountRef} />
      <hr />
      <h2>To Podcast App</h2>
      <TextInput defaultValue={settings.payments.toPodcastApp.boostAmount} label='Boost amount in satoshis' onBlur={handleSetPodcastAppBoostAmount} ref={toPodcastAppBoostAmountRef} />
      <TextInput defaultValue={settings.payments.toPodcastApp.streamingAmount} label='Stream amount per minute in satoshis' onBlur={handleSetPodcastAppStreamingAmount} ref={toPodcastAppStreamingAmountRef} />
    </div>
  )
}
