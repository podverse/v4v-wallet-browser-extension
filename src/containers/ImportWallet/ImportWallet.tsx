import React from 'react'
import { BackButton, Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const ImportWallet = ({ setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._noWallet)
  }

  const handleImportWallet = async () => {
    await chrome.storage.local.set({ 'walletInfo': {} })
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  return (
    <div className='container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='import-wallet-container'>
        <Button className='import-wallet' isSecondary onClick={handleImportWallet} text='Import Wallet' />
      </div>
    </div>
  )
}
