import React, { useEffect, useState } from 'react'
import '../../styles/index'
import type { V4VHiddenElement } from '../../lib/types'
import {
  About,
  Boost,
  Consent,
  CreateWallet,
  MainMenu,
  Deposit,
  ExportWallet,
  ImportWallet,
  NoWallet,
  Settings,
  TransactionHistory,
  Withdraw
} from '../../containers'
import { LoadingSpinner } from '../../components';
import { handleV4VHiddenElement } from '../../lib/v4vHiddenElement';
import { Constants } from '../../resources/Constants'

import '../../state/index.tsx'
import initialState from '../../state/initialState.json'
const OmniAural = require('omniaural')
OmniAural.initGlobalState(initialState)

chrome.tabs.query({ active: true }, async function (tabs) {
  let tab = tabs[0];

  if (tab?.id) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: handleV4VHiddenElement
      }
    )
  }
});

const initializeSettings = async () => {
  await chrome.storage.local.set({
    settings: {
      payments: {
        toPodcast: {
          boostAmount: 190,
          streamingAmount: 19
        },
        toPodcastApp: {
          boostAmount: 10,
          streamingAmount: 1
        }
      }
    }
  })
}

const Popup = () => {
  const [currentPage, setCurrentPage] = useState(Constants.RouteNames.keys._consent)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>('podverse-dark')

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'acceptedTermsOfService',
        'connectedTabInfo',
        'settings',
        'v4vHiddenElement',
        'walletInfo'
      ])
      const { acceptedTermsOfService, settings, walletInfo } = storageData

      if (!settings) {
        await initializeSettings()
      }

      if (!acceptedTermsOfService) {
        setCurrentPage(Constants.RouteNames.keys._consent)
      } else if (!walletInfo) {
        setCurrentPage(Constants.RouteNames.keys._noWallet)
      } else {
        setCurrentPage(Constants.RouteNames.keys._boost)
      }

      setHasInitialized(true)
    })()
  }, [])

  const wrapperClassName = `theme-wrapper theme-${selectedTheme}`

  return (
    <div className={wrapperClassName}>
      <div className="popup-wrapper">
        {
          !hasInitialized && (
            <LoadingSpinner fillSpace size='large' />
          )
        }
        {
          hasInitialized && (
            <>
              <About hideContainer={currentPage !== Constants.RouteNames.keys._about} setCurrentPage={setCurrentPage} />
              <Boost hideContainer={currentPage !== Constants.RouteNames.keys._boost} setCurrentPage={setCurrentPage} />
              <Consent hideContainer={currentPage !== Constants.RouteNames.keys._consent} setCurrentPage={setCurrentPage} />
              <CreateWallet hideContainer={currentPage !== Constants.RouteNames.keys._createWallet} setCurrentPage={setCurrentPage} />
              <Deposit hideContainer={currentPage !== Constants.RouteNames.keys._deposit} setCurrentPage={setCurrentPage} />
              <ExportWallet hideContainer={currentPage !== Constants.RouteNames.keys._exportWallet} setCurrentPage={setCurrentPage} />
              <ImportWallet hideContainer={currentPage !== Constants.RouteNames.keys._importWallet} setCurrentPage={setCurrentPage} />
              <MainMenu hideContainer={currentPage !== Constants.RouteNames.keys._mainMenu} setCurrentPage={setCurrentPage} />
              <NoWallet hideContainer={currentPage !== Constants.RouteNames.keys._noWallet} setCurrentPage={setCurrentPage} />
              <Settings hideContainer={currentPage !== Constants.RouteNames.keys._settings} setCurrentPage={setCurrentPage} />
              <TransactionHistory hideContainer={currentPage !== Constants.RouteNames.keys._transactionHistory} setCurrentPage={setCurrentPage} />
              <Withdraw hideContainer={currentPage !== Constants.RouteNames.keys._withdraw} setCurrentPage={setCurrentPage} />
            </>
          )
        }
      </div>
    </div>
  );
};

export default Popup;
