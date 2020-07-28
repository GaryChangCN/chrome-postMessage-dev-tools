debugger;
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  debugger;
  var devToolsListener = function(message, sender, sendResponse) {
    debugger;
    // Inject a content script into the identified tab
    chrome.tabs.executeScript(message.tabId,
        { file: message.scriptToInject });
  }
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function() {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});