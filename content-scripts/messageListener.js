chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "SHORTCUT_TRIGERRED"){
        const className = message.className;
        const element = document.querySelector('annotator-toolbar').shadowRoot.querySelector(`.${className}`);
        element.click();
    }
    else if(message.type == "UPDATE_PROPERTIES"){
        updated_properties = message.properties;
    }
    else if(message.type === "saveAndShare"){
        window.print();
    }
});
