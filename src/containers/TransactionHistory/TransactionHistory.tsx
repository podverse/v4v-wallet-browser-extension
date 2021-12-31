import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const TransactionHistory = ({ setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  return (
    <div className='transaction-history container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='fill-space'>
        TransactionHistory
      </div>
    </div>
  )
}
