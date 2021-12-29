import React, { useEffect, useState } from 'react';
import './Popup.css';
import type { V4VData } from '../../types'

import {
  About,
  Boost,
  Boostagram,
  ConsentScreen,
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
import { LoadingSpinner } from '../../components';
import { handleV4VHiddenElement } from '../../lib/v4vHiddenElement';

const _aboutKey = 'About'
const _boostKey = 'Boost'
const _boostagramKey = 'Boostagram'
const _consentScreenKey = 'ConsentScreen'
const _createWalletKey = 'CreateWallet'
const _dashboardKey = 'Dashboard'
const _depositKey = 'Deposit'
const _exportWalletKey = 'ExportWallet'
const _importWalletKey = 'ImportWallet'
const _initialScreenKey = 'InitialScreen'
const _settingsKey = 'Settings'
const _transactionHistoryKey = 'TransactionHistory'
const _withdrawKey = 'Withdraw'

chrome.tabs.query({ active: true }, function (tabs) {
  let tab = tabs[0];

  if (tab?.id) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: handleV4VHiddenElement
      }
    );
  }
});

const Popup = () => {
  const [currentPage, setCurrentPage] = useState(_consentScreenKey)
  const [v4vData, setV4VData] = useState<V4VData | null>(null)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      const storageData = await chrome.storage.local.get(['v4vData'])
      const latestV4VData = storageData.v4vData
      setV4VData(latestV4VData || null)
      setHasInitialized(true)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="popup-wrapper">
      {
        !hasInitialized && (
          <div className='popup-spinner-wrapper'>
            <LoadingSpinner />
          </div>
        )
      }
      {
        hasInitialized && (
          <>
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
              currentPage === _consentScreenKey && (
                <ConsentScreen />
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
          </>
        )
      }
    </div>
  );
};

export default Popup;
