import React, { forwardRef } from 'react'

type Props = {
  defaultValue?: string
  label: string
  onBlur?: any
  placeholder?: string
}

const Component = ({ defaultValue, label, onBlur, placeholder }: Props, ref: any) => {
  return (
    <div className='text-input-wrapper'>
      <label>{label}</label>
      <input defaultValue={defaultValue} onBlur={onBlur} placeholder={placeholder} ref={ref} />
    </div>
  )
}

const forwardedRef = forwardRef(Component)

export const TextInput = forwardedRef
