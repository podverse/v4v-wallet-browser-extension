import React from 'react'
import { BackButton, MenuItem } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const MainMenu = ({ setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  return (
    <div className='main-menu container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <MenuItem
        handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._deposit)}
        text='Deposit' />
      <MenuItem
        handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._withdraw)}
        text='Withdraw' />
      <MenuItem
        handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._transactionHistory)}
        text='Transaction History' />
      <MenuItem
        handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._exportWallet)}
        text='Export Wallet' />
      <MenuItem
        handleSetCurrentPage={() => setCurrentPage(Constants.RouteNames.keys._settings)}
        text='Settings' />
    </div>
  )
}
