import React, { forwardRef } from 'react'

type Props = {
  defaultValue?: string
  placeholder?: string
}

const Component = ({ defaultValue, placeholder }: Props, ref: any) => {
  return (
    <div className='text-area-wrapper'>
      <textarea defaultValue={defaultValue} placeholder={placeholder} ref={ref} rows={3} />
    </div>
  )
}

const forwardedRef = forwardRef(Component)

export const TextArea = forwardedRef
