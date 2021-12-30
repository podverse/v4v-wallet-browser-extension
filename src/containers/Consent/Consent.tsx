import React, { useState } from 'react'
import { Button, Checkbox, Link } from '../../components'
import { Constants } from '../../resources/Constants'

type Props = {
  setCurrentPage: any
}

export const Consent = ({ setCurrentPage }: Props) => {
  const [hasAccepted, setHasAccepted] = useState<boolean>(false)

  const handleAccept = async () => {
    await chrome.storage.local.set({ acceptedTermsOfService: true })
    setCurrentPage(Constants.RouteNames.keys._noWallet)
  }

  const handleCancel = async () => {
    await chrome.storage.local.set({ acceptedTermsOfService: false })
    window.close()
  }

  return (
    <div className='consent container-wrapper'>
      <h1>Terms of Service</h1>
      <p>The V4V Wallet lets you make network requests to send Bitcoin transactions over the Bitcoin Lightning Network.</p>
      <p>All V4V Wallet software is provided AS IS, with no warranty. Your transactions cannot be reversed or recovered.</p>
      <p>Only use the V4V Wallet for sending small amounts that you are willing to lose if something should go wrong.</p>
      <p>Sending Bitcoin over the Lightning Network may include a network fee. The V4V Wallet does not control the network fee, and it is automatically added to your transaction amount.</p>
      <p>All code for this extension is provided under a free and open source license.</p>
      <p><Link target='_blank' text='Code Repository' url='https://github.com/podverse/v4v-wallet-chrome-extension' /></p>
      <Checkbox
        checked={hasAccepted}
        label='I understand and accept the terms.'
        onChange={(val: boolean) => setHasAccepted(val)}
      />
      <Button disabled={!hasAccepted} isPrimary onClick={handleAccept} text='Accept' />
      <Button isSecondary onClick={handleCancel} text='Cancel' />
    </div>
  )
}
