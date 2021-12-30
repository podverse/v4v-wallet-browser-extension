import React from 'react'
import { Link } from '..'

type Props = {
  handleSetCurrentPage: any
}

export const BackButton = ({ handleSetCurrentPage }: Props) => {
  return (
    <div className='back-button-wrapper'>
      <Link className='back-button' handleSetCurrentPage={handleSetCurrentPage} text={'< Back'} />
    </div>
  )
}
