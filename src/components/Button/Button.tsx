import React from 'react'

type Props = {
  className?: string
  disabled?: boolean
  isLink?: boolean
  isPrimary?: boolean
  isSecondary?: boolean
  isDanger?: boolean
  onClick?: any
  text?: string
}

export const Button = ({ className, disabled, isDanger, isLink, isPrimary, isSecondary, onClick, text }: Props) => {
  const finalClassName = `
    button
    ${className ? className : ''}
    ${isLink ? 'is-link' : ''}
    ${isPrimary ? 'is-primary' : ''}
    ${isSecondary ? 'is-secondary' : ''}
    ${isDanger ? 'is-danger' : ''}
  `

  return (
    <button className={finalClassName} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}
