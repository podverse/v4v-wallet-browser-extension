import React from 'react'

/* Loading spinner copied from https://loading.io/css/ */

type Props = {
  className?: string
  fillSpace?: boolean
  size: 'small' | 'large'
}

export const LoadingSpinner = ({ className, fillSpace, size = 'large' }: Props) => {
  const wrapperClass = `loading-spinner ${className ? className : ''} ${fillSpace ? 'fill-space' : ''}`
  const loaderClass = `loader ${size}`

  return (
    <div className={wrapperClass}>
      <div aria-label='Loading' className={loaderClass} />
    </div>
  )
}
