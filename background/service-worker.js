const welcomePage = "../src/sidePanel/welcome/welcomeSidePanel.html";
const mainPage = "../src/sidePanel/main/sidePanel.html";

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({ path: welcomePage });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
  
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    const { path } = await chrome.sidePanel.getOptions({ tabId });

    if(path !== welcomePage){
      chrome.sidePanel.setOptions({ path: mainPage, enabled: false});
      chrome.sidePanel.setOptions({ path: mainPage, enabled: true});  
    }  
    else{
      chrome.sidePanel.setOptions({ path: welcomePage, enabled: false});
      chrome.sidePanel.setOptions({ path: welcomePage, enabled: true});
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "UPDATE_PROPERTIES"){
        // console.log(message.type);
        chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
            chrome.tabs.sendMessage(tabs[0].id, message);
            // console.log(tabs[0])
        });
    }
    else if(message.type == "saveAndShare"){
      chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id, message);
      });
    }
    else if(message.type == "addNote"){
      chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
        chrome.sidePanel.open({tabId: tabs[0].id});
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
    }
});

chrome.commands.onCommand.addListener((command)=>{
  if(command === "textMarker"){
    const className = "text-marker";
    chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id, {type: "SHORTCUT_TRIGERRED", className});
    });
    // console.log(className);
  }
  else{
    const className = command;
    chrome.tabs.query({active:true, currentWindow:true}, (tabs)=>{
      chrome.tabs.sendMessage(tabs[0].id,  {type: "SHORTCUT_TRIGERRED", className});
    });
    // console.log(className);
  }
})