import React from 'react'
import { BackButton, Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const ExportWallet = ({ hideContainer, setCurrentPage }: Props) => {
  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  const wrapperClassName = `export-wallet container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <h1>Export</h1>
      <h2>Download Wallet Keys</h2>
      <p>Download a text file containing your wallet keys.</p>
      <Button isPrimary text='Download' />
      <hr />
      <h2>QR Code</h2>
      <p>Scan this QR code with a V4V compatible app to import your wallet keys.</p>
    </div>
  )
}
