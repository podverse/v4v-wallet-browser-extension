chrome.tabs.query({ active: true }, function (tabs) {
  let tab = tabs[0];

  console.log('background active tab', tabs)
});

const handleWebNavigationOnCompleted = (details) => {
  console.log('handleWebNavigationOnCompleted', details)
}

chrome.webNavigation.onCompleted.addListener(handleWebNavigationOnCompleted)
