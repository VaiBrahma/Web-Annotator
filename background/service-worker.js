const welcomePage = "../src/sidePanel/welcome/welcomeSidePanel.html";
const mainPage = "../src/sidePanel/main/sidePanel.html";

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({ path: welcomePage });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
  
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    const { path } = await chrome.sidePanel.getOptions({ tabId });
    chrome.sidePanel.setOptions({ path: mainPage, enabled: false});
    chrome.sidePanel.setOptions({ path: mainPage, enabled: true});    
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "UPDATE_PROPERTIES"){
        console.log(message.type);
        chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, message);
            // console.log(tabs[0])
        });
    }
});

chrome.commands.onCommand.addListener((command)=>{
  console.log(command);
})