import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const About = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = async () => {
    const storageData = await chrome.storage.local.get([
      'acceptedTermsOfService',
      'walletInfo'
    ])

    const { acceptedTermsOfService, walletInfo } = storageData
    if (!acceptedTermsOfService) {
      setCurrentPage(Constants.RouteNames.keys._consent)
    } else if (!walletInfo) {
      setCurrentPage(Constants.RouteNames.keys._noWallet)
    } else {
      setCurrentPage(Constants.RouteNames.keys._boost)
    }
  }

  const wrapperClassName = `container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
    </div>
  )
}
