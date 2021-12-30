import React from 'react'

type Props = {
  showMoreButton?: boolean
}

export const HeaderBar = ({ showMoreButton }: Props) => {
  return (
    <div className='header-bar'>
      <div className='balance'>Balance: 54,321 sats</div>
      {
        showMoreButton && (
          <div className='more-button'>More</div>
        )
      }
    </div>
  )
}
