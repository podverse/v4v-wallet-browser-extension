import React from 'react'

type Props = {
  target?: '_blank'
  text: string
  url?: string
}

export const Link = ({ target, text, url }: Props) => {
  const handleTargetBlank = () => {
    chrome.tabs.create({ url })
    return false
  }

  return (
    <a
      className='link'
      {...(target === '_blank' ? { onClick: handleTargetBlank } : {})}>
      {text}
    </a>
  )
}
