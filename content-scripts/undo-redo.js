function saveCustomElementState(state) {
    chrome.storage.local.get('customElements', function(data) {
        const customeElements = data.customeElements || [];
        customeElements.push(state);
        chrome.storage.local.set({'customElements': customElements});
    })
}
function undoLastCustomElement() {
    chrome.storage.local.get('customElements', function(data) {
        const customeElements = data.customeElements || [];
        const lastElementState = customeElements.pop();
        /////////////

        /////////////
        chrome.storage.local.set({'customElements': customElements});
    })
}
function redoLastUndoneCustomElement() {
    chrome.storage.local.get('customElements', function(data) {
        const customeElements = data.customeElements || [];
        const lastUndoneElementState =3 ;
        customeElements.push(lastUndoneElementState);
        chrome.storage.local.set({'customElements': customElements});
    })
}