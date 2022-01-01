import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const ExportWallet = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  const wrapperClassName = `export-wallet container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='fill-space'>
        ExportWallet
      </div>
    </div>
  )
}
