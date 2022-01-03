import QRCode from 'qrcode'
import React, { useEffect } from 'react'
import { BackButton, Button } from '../../components'
import { Constants } from '../../resources'

type Props = {
  hideContainer: boolean
  setCurrentPage: any
}

export const ExportWallet = ({ hideContainer, setCurrentPage }: Props) => {
  useEffect(() => {
    const walletKeysUrl = 'v4v-wallet://public-key/private-key'
    const canvas = document.getElementById('qr-code-canvas')
    if (walletKeysUrl && canvas) {
      QRCode.toCanvas(canvas, walletKeysUrl)
    }
  }, [])

  const handleBackButton = () => {
    setCurrentPage(Constants.RouteNames.keys._mainMenu)
  }

  const wrapperClassName = `export-wallet container-wrapper ${hideContainer ? 'hide' : ''}`

  return (
    <div className={wrapperClassName}>
      <BackButton handleSetCurrentPage={handleBackButton} />
      <h1>Export</h1>
      <h2>Wallet Keys</h2>
      <p>Download a text file containing your wallet keys.</p>
      <div>
        <Button isPrimary text='Download' />
      </div>
      <hr />
      <h2>QR Code</h2>
      <p>Scan this QR code with a V4V compatible app to import your wallet keys.</p>
      <div className='fill-space'>
        <canvas id='qr-code-canvas' />
      </div>
    </div>
  )
}
