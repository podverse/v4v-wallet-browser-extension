import React from 'react'

/* Loading spinner copied from https://loading.io/css/ */

type Props = {
  fillSpace?: boolean
}

export const LoadingSpinner = ({ fillSpace }: Props) => {
  const wrapperClass = `${fillSpace ? 'fill-space' : ''}`

  return (
    <div className={wrapperClass}>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
