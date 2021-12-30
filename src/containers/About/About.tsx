import React from 'react'
import { BackButton } from '../../components'
import { Constants } from '../../resources'

type Props = {
  setCurrentPage: any
}

export const About = ({ setCurrentPage }: Props) => {
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

  return (
    <div className='container-wrapper'>
      <BackButton handleSetCurrentPage={handleBackButton} />
    </div>
  )
}
