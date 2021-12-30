import React from 'react'

type Props = {
  onClick: any
  showButton?: boolean
}

export const MoreButton = ({ onClick, showButton }: Props) => {
  const wrapperClass = `more-button ${showButton ? '' : 'hide'}`

  return (
    <button className={wrapperClass} onClick={onClick}>
      <div className='more-button-row' />
      <div className='more-button-row' />
      <div className='more-button-row' />
    </button>
  )
}
