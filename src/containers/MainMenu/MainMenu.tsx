import React from 'react'
import { BackButton, MenuItem } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const MainMenu = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._boost)
  }

  const wrapperClassName = `main-menu container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
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
