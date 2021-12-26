import React, { useEffect, useState } from 'react';
import './Popup.css';
import type { V4VData } from '../../types'

import {
  About,
  Boost,
  Boostagram,
  CreateWallet,
  Dashboard,
  Deposit,
  ExportWallet,
  ImportWallet,
  InitialScreen,
  Settings,
  TransactionHistory,
  Withdraw
} from '../../containers'

const _aboutKey = 'About'
const _boostKey = 'Boost'
const _boostagramKey = 'Boostagram'
const _createWalletKey = 'CreateWallet'
const _dashboardKey = 'Dashboard'
const _depositKey = 'Deposit'
const _exportWalletKey = 'ExportWallet'
const _importWalletKey = 'ImportWallet'
const _initialScreenKey = 'InitialScreen'
const _settingsKey = 'Settings'
const _transactionHistoryKey = 'TransactionHistory'
const _withdrawKey = 'Withdraw'

const Popup = () => {
  const [currentPage, setCurrentPage] = useState('InitialScreen')
  const [v4vData, setV4VData] = useState<V4VData>({
    episodeTitle: 'Untitled Episode',
    isPlaying: false,
    playbackPosition: 0,
    podcastIndexId: null,
    podcastTitle: 'Untitled Podcast',
    valueTag: []
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      const storageData = await chrome.storage.local.get(['v4vData'])
      console.log('asdf', storageData)
      const latestV4VData = storageData.v4vData
      setV4VData(latestV4VData || null)
    }, 1000)

    return () => { interval }
  }, [])

  return (
    <div className="App">
      {
        currentPage === _aboutKey && (
          <About />
        )
      }
      {
        currentPage === _boostKey && (
          <Boost />
        )
      }
      {
        currentPage === _boostagramKey && (
          <Boostagram />
        )
      }
      {
        currentPage === _createWalletKey && (
          <CreateWallet />
        )
      }
      {
        currentPage === _dashboardKey && (
          <Dashboard />
        )
      }
      {
        currentPage === _depositKey && (
          <Deposit />
        )
      }
      {
        currentPage === _exportWalletKey && (
          <ExportWallet />
        )
      }
      {
        currentPage === _importWalletKey && (
          <ImportWallet />
        )
      }
      {
        currentPage === _initialScreenKey && (
          <InitialScreen v4vData={v4vData} />
        )
      }
      {
        currentPage === _settingsKey && (
          <Settings />
        )
      }
      {
        currentPage === _transactionHistoryKey && (
          <TransactionHistory />
        )
      }
      {
        currentPage === _withdrawKey && (
          <Withdraw />
        )
      }
    </div>
  );
};

export default Popup;
