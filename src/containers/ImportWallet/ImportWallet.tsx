import React from 'react'
import { Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const ImportWallet = ({ setCurrentPage }: Props) => {
  const handleImportWallet = () => {
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  return (
    <div className='import-wallet-container container-wrapper'>
      <Button className='import-wallet' onClick={handleImportWallet} text='Import Wallet' />
    </div>
  )
}
