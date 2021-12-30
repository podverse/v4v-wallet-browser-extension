import React from 'react'

type Props = {
  className?: string
  handleSetCurrentPage?: any
  isBold?: boolean
  target?: '_blank'
  text: string
  url?: string
}

export const Link = ({ className, handleSetCurrentPage, isBold, target, text, url }: Props) => {
  const handleTargetBlank = () => {
    chrome.tabs.create({ url })
    return false
  }

  const finalClassName = `
    link
    ${className ? className : ''}
    ${isBold ? 'is-bold' : ''}
  `

  return (
    <a
      className={finalClassName}
      {...(target === '_blank' ? { onClick: handleTargetBlank } : {})}
      {...(handleSetCurrentPage ? { onClick: handleSetCurrentPage } : {})}>
      {text}
    </a>
  )
}
