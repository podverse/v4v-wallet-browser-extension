
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    const updateConnectedTabInfo = async () => {
      await chrome.storage.local.set({
        connectedTabInfo: {
          streamingEnabled: true,
          tabId: tab.id
        }
      })
    }

    updateConnectedTabInfo()
  })
})

const handleWebNavigationOnCompleted = (details) => {
  console.log('handleWebNavigationOnCompleted', details)
}

chrome.webNavigation.onCompleted.addListener(handleWebNavigationOnCompleted)
