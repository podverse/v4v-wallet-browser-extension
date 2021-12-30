import React from 'react'
import { LoadingSpinner } from '..'

type Props = {
  className?: string
  disabled?: boolean
  isLink?: boolean
  isLoading?: boolean
  isPrimary?: boolean
  isSecondary?: boolean
  isDanger?: boolean
  onClick?: any
  text?: string
  textBottom?: string
}

export const Button = ({ className, disabled, isDanger, isLink, isLoading = false, isPrimary, isSecondary, onClick, text, textBottom }: Props) => {
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
      {
        isLoading && (
          <LoadingSpinner size='small' />
        )
      }
      {
        !isLoading && (
          <div className='text-wrapper'>
            <div className='top-text'>
              {text}
            </div>
            {
              textBottom && (
                <div className='bottom-text'>
                  {textBottom}
                </div>
              )
            }
          </div>
        )
      }
    </button>
  )
}
