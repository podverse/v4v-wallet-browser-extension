import React from 'react'

/* Loading spinner copied from https://loading.io/css/ */

type Props = {
  fillSpace?: boolean
  size: 'small' | 'large'
}

export const LoadingSpinner = ({ fillSpace, size = 'large' }: Props) => {
  const wrapperClass = `${fillSpace ? 'fill-space' : ''}`
  const loaderClass = `loader ${size}`

  return (
    <div className={wrapperClass}>
      <div aria-label='Loading' className={loaderClass} />
    </div>
  )
}
