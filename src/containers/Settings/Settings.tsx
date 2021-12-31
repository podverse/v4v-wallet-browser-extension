import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const Settings = ({ setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  return (
    <div className='settings container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='fill-space'>
        Settings
      </div>
    </div>
  )
}
