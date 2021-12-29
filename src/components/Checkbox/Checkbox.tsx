import React from 'react'

type Props = {
  checked?: boolean
  label: string
  onChange: any
}

export const Checkbox = ({ checked, label, onChange }: Props) => {

  return (
    <div className='checkbox'>
      <label>
        <input checked={checked} onChange={() => onChange(!checked)} type='checkbox' />
        <div className='text'>
          {label}
        </div>
      </label>
    </div>
  )
}
