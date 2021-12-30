import React, { useEffect, useState } from 'react';
import './Popup.css';
import type { V4VData } from '../../resources/types'

import {
  About,
  Boost,
  Consent,
  CreateWallet,
  Dashboard,
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
  const [currentPage, setCurrentPage] = useState(Constants.RouteNames.keys._consent)
  const [v4vData, setV4VData] = useState<V4VData | null>(null)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    ; (async () => {
      const storageData = await chrome.storage.local.get([
        'acceptedTermsOfService',
        'v4vData',
        'walletInfo'
      ])
      const { acceptedTermsOfService, v4vData, walletInfo } = storageData

      if (!acceptedTermsOfService) {
        setCurrentPage(Constants.RouteNames.keys._consent)
      } else if (!walletInfo) {
        setCurrentPage(Constants.RouteNames.keys._noWallet)
      } else {
        setCurrentPage(Constants.RouteNames.keys._boost)
      }

      setV4VData(v4vData || null)
      setHasInitialized(true)
    })()
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
              currentPage === Constants.RouteNames.keys._dashboard && (
                <Dashboard setCurrentPage={setCurrentPage} />
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
  );
};

export default Popup;
