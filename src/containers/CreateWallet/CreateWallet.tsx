import React from 'react'
import { Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const CreateWallet = ({ setCurrentPage }: Props) => {
  const handleCreateWallet = () => {
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  return (
    <div className='create-wallet-container container-wrapper'>
      <Button className='create-wallet' onClick={handleCreateWallet} text='Create Wallet' />
    </div>
  )
}
