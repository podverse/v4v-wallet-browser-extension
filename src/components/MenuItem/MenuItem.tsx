import React from 'react'
import { Link } from '..'

type Props = {
  handleSetCurrentPage: any
  text: string
}

export const MenuItem = ({ handleSetCurrentPage, text }: Props) => {
  return (
    <div className='menu-item'>
      <Link handleSetCurrentPage={handleSetCurrentPage} text={text} />
    </div>
  )
}
