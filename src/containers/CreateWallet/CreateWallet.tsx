import React from 'react'
import { BackButton, Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const CreateWallet = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._noWallet)
  }

  const handleCreateWallet = async () => {
    await chrome.storage.local.set({ 'walletInfo': {} })
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  const wrapperClassName = `container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='create-wallet-container'>
        <Button className='create-wallet' isSecondary onClick={handleCreateWallet} text='Create Wallet' />
      </div>
    </div>
  )
}
