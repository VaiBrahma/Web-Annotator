const tab = document.querySelector("#tabid");
const url = document.querySelector("#url");
const notesList = document.querySelector("#notesList");

const notes = [
    {"note": "note1"},
    {"note": "note2"},
    {"note": "note3"},
    {"note": "note4"},
    {"note": "note5"},
    {"note": "note5"},
    {"note": "Shrishvesh kuch is tarah se hum sidePanel me notes save karenge jo tab specific honge, matlab har url ke liye alag alag notes. ye jo notes dikh rahe hain ye maine ek array of object banayi hai manually."},
    {"note": "note5"},
    {"note": "note5"},
    {"note": "note5"},
    {"note": "note5"},
    {"note": "note5"},
    {"note": "note5"},
]

const getTabId = async ()=>{
    await chrome.tabs.query({
        active: true,
        currentWindow: true
    }).then(e=> {
        tab.innerHTML += e[0].id;
        url.innerHTML += e[0].url;
    });
}

getTabId();

const listItems = notes.map( (e, key)=>{
    return `<li id=${key}>${e.note}</li>`;
})

notesList.innerHTML = listItems.join('');

async function loadTemplate() {
    const response = await fetch(chrome.runtime.getURL('src/customization-popup/popupContainer.html'));
    const template = await response.text();
    this.shadowRoot.innerHTML += template;
  }

async function loadPanels(fileName, element) {
    const response = await fetch(chrome.runtime.getURL(`src/customization-popup/panels/${fileName}.html`));
    const template = await response.text();
    element.innerHTML = template;
}

const panels = document.getElementById('panels');
const colorPanel = document.createElement('div');
const opacityPanel = document.createElement('div');
        
loadPanels("colorPanel", colorPanel);
loadPanels("opacityPanel", opacityPanel);
panels.appendChild(colorPanel);
panels.appendChild(opacityPanel);