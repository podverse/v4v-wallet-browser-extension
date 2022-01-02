import React, { forwardRef } from 'react'

type Props = {
  defaultValue?: string
  label: string
  onBlur?: any
  placeholder?: string
  type: 'number' | 'text'
}

const Component = ({ defaultValue, label, onBlur, placeholder, type }: Props, ref: any) => {
  return (
    <div className='text-input'>
      <div className='text-input-outer-wrapper'>
        <div className='text-input-inner-wrapper'>
          <div className='eyebrow'>{label}</div>
          <input defaultValue={defaultValue} onBlur={onBlur} placeholder={placeholder} ref={ref} type={type} />
        </div>
      </div>
    </div>
  )
}

const forwardedRef = forwardRef(Component)

export const TextInput = forwardedRef
