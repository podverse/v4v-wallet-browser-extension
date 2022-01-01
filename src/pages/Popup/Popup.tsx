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
import { getHostname, getUITheme } from '../../lib/utility'
import { handleV4VHiddenElement } from '../../lib/v4vHiddenElement';
import { Constants } from '../../resources/Constants'

chrome.tabs.query({ active: true }, async function (tabs) {
  let tab = tabs[0];

  if (tab?.id) {
    const updateConnectedTabInfo = async () => {
      await chrome.storage.local.set({
        connectedTabInfo: {
          hostname: getHostname(tab.url || ''),
          streamingEnabled: true,
          tabId: tab.id
        }
      })
    }

    await updateConnectedTabInfo()

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: handleV4VHiddenElement
      }
    )
  }
});

const Popup = () => {
  const [currentPage, setCurrentPage] = useState(Constants.RouteNames.keys._consent)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>('podverse')

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'acceptedTermsOfService',
        'connectedTabInfo',
        'settings',
        'v4vHiddenElement',
        'walletInfo'
      ])
      const { acceptedTermsOfService, connectedTabInfo, v4vHiddenElement, walletInfo } = storageData

      if (!acceptedTermsOfService) {
        setCurrentPage(Constants.RouteNames.keys._consent)
      } else if (!walletInfo) {
        setCurrentPage(Constants.RouteNames.keys._noWallet)
      } else {
        setCurrentPage(Constants.RouteNames.keys._boost)
      }

      const hostname = connectedTabInfo?.hostname
      const uiTheme = v4vHiddenElement?.uiTheme
      const selectedTheme = getUITheme(hostname, uiTheme)
      setSelectedTheme(selectedTheme)

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
              {
                currentPage === Constants.RouteNames.keys._about && (
                  <About setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._boost && (
                  <Boost setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._consent && (
                  <Consent setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._createWallet && (
                  <CreateWallet setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._deposit && (
                  <Deposit setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._exportWallet && (
                  <ExportWallet setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._importWallet && (
                  <ImportWallet setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._mainMenu && (
                  <MainMenu setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._noWallet && (
                  <NoWallet setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._settings && (
                  <Settings setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._transactionHistory && (
                  <TransactionHistory setCurrentPage={setCurrentPage} />
                )
              }
              {
                currentPage === Constants.RouteNames.keys._withdraw && (
                  <Withdraw setCurrentPage={setCurrentPage} />
                )
              }
            </>
          )
        }
      </div>
    </div>
  );
};

export default Popup;
