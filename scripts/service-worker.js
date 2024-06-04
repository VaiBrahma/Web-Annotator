const welcomePage = "src/sidePanel/welcome/welcomeSidePanel.html";
const mainPage = "src/sidePanel/main/sidePanel.html";
chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({ path: welcomePage });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });
  
  chrome.tabs.onActivated.addListener(async ({ tabId }) => {

    const { path } = await chrome.sidePanel.getOptions({ tabId });
    chrome.sidePanel.setOptions({ path: mainPage, enabled: false});
    chrome.sidePanel.setOptions({ path: mainPage, enabled: true});
  });