import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const ExportWallet = ({ setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  return (
    <div className='export-wallet container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
      ExportWallet
    </div>
  )
}
