import React from 'react'
import { Button, Link } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const NoWallet = ({ setCurrentPage }: Props) => {
  const handleCreateWallet = () => {
    setCurrentPage(Constants.RouteNames.keys._createWallet)
  }

  const handleImportWallet = () => {
    setCurrentPage(Constants.RouteNames.keys._importWallet)
  }

  return (
    <div className='no-wallet-container container-wrapper'>
      <h1>V4V Wallet</h1>
      <div className='button-wrapper'>
        <Button className='create-wallet' isSecondary onClick={handleCreateWallet} text='Create Wallet' />
        <Button className='import-wallet' isSecondary onClick={handleImportWallet} text='Import Wallet' />
      </div>
      <div className='footer'>
        <Link handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._about)} isBold text='About' />
      </div>
    </div>
  )
}
