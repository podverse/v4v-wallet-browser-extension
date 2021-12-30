import React from 'react'

type Props = {
  defaultValue?: string
  placeholder?: string
  ref: any
}

export const TextArea = ({ defaultValue, placeholder, ref }: Props) => {
  return (
    <div className='text-area-wrapper'>
      <textarea defaultValue={defaultValue} placeholder={placeholder} ref={ref} rows={3} />
    </div>
  )
}
