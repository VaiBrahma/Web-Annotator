function saveElementState(state) {
    chrome.storage.local.get('savedElements', (data) => {
        const savedElements = data.savedElements || [];
        savedElements.push(state);
        chrome.storage.local.set({'savedElements': savedElements});
    })
}
function undoLastSavedElement() {
    let lastElementState = [];
    chrome.storage.local.get('savedElements', (data) => {
        const savedElements = data.savedElements || [];
        lastElementState = savedElements.pop();

        chrome.storage.local.get('undoneElements', (data) => {
            const undoneElements = data.undoneElements || [];
            undoneElements.push(lastElementState);
            chrome.storage.local.set({'undoneElements': undoneElements});
        })
        /////////////

        /////////////
        chrome.storage.local.set({'savedElements': savedElements});
    })
}
function redoLastUndoneElement() {
    chrome.storage.local.get('savedElements', (data) => {
        const savedElements = data.savedElements || [];
        let lastUndoneElementState = [];

        chrome.storage.local.get('undoneElements', (data) => {
            const undoneElements = data.undoneElements || [];
            lastUndoneElementState = undoneElements.pop();
        })
        savedElements.push(lastUndoneElementState);
        chrome.storage.local.set({'customElements': customElements});
    })
}