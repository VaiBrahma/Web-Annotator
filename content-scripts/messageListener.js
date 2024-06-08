chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === "SHORTCUT_TRIGERRED"){
        const className = message.className;
        const element = document.querySelector('annotator-toolbar').shadowRoot.querySelector(`.${className}`);
        element.click();
    }
});
  
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === "UPDATE_PROPERTIES"){
        // console.log(message.properties);
        updated_properties = message.properties;
    }
});
  