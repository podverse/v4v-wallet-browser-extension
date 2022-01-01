import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const Deposit = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  const wrapperClassName = `deposit container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <div className='fill-space'>
        Deposit
      </div>
    </div>
  )
}
