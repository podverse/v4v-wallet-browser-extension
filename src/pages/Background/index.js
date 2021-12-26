console.log('This is the background page.');
console.log('Put the background scripts here.');

var myURL = 'https://podverse.fm/v4v'

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('asdf', message, sender)
  sendResponse({
    data: "backgrroooooound"
  });
})
