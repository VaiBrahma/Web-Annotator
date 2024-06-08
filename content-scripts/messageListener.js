chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "UPDATE_PROPERTIES"){
        // console.log(message.properties);
        updated_properties = message.properties;
    }
});
  