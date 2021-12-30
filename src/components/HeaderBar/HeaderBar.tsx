import React from 'react'
import { MoreButton } from '..'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
  showMoreButton?: boolean
}

export const HeaderBar = ({ setCurrentPage, showMoreButton }: Props) => {
  const handleMoreButtonClick = () => {
    setCurrentPage(Constants.RouteNames.keys._dashboard)
  }

  return (
    <div className='header-bar'>
      <div className='balance'>Balance: 54,321 sats</div>
      <MoreButton onClick={handleMoreButtonClick} showButton={showMoreButton} />
    </div>
  )
}
