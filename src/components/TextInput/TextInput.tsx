import React, { forwardRef } from 'react'

type Props = {
  defaultValue?: string
  placeholder?: string
}

const Component = ({ defaultValue, placeholder }: Props, ref: any) => {
  return (
    <div className='text-input-wrapper'>
      <input defaultValue={defaultValue} placeholder={placeholder} ref={ref} />
    </div>
  )
}

const forwardedRef = forwardRef(Component)

export const TextInput = forwardedRef
