const tab = document.querySelector("#tabid");
const url = document.querySelector("#url");
const notesList = document.querySelector("#notesList");

const notes = [
    {"note": "note1"},
    // {"note": "note2"},
    // {"note": "note3"},
    // {"note": "note4"},
    // {"note": "note5"},
    // {"note": "note5"},
    // {"note": "Shrishvesh kuch is tarah se hum sidePanel me notes save karenge jo tab specific honge, matlab har url ke liye alag alag notes. ye jo notes dikh rahe hain ye maine ek array of object banayi hai manually."},
    // {"note": "note5"},
    // {"note": "note5"},
    // {"note": "note5"},
    // {"note": "note5"},
    // {"note": "note5"},
    // {"note": "note5"},
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
    const response = await fetch(chrome.runtime.getURL('src/customization/popupContainer.html'));
    const template = await response.text();
    this.shadowRoot.innerHTML += template;
  }

async function loadPanels(fileName, element) {
    const response = await fetch(chrome.runtime.getURL(`src/customization/panels/${fileName}.html`));
    const template = await response.text();
    element.innerHTML = template;
}

const color = document.querySelector('.color');
const colorValue = document.querySelector('.colorValue');
const opacity = document.querySelector('.opacity');
const opacityValue = document.querySelector('.opacityValue');

const panels = document.getElementById('panels');
const colorPanel = document.createElement('div');
const opacityPanel = document.createElement('div');
        
const properties = {
    color: "",
    backgroundcolor: "",
    bordercolor: "",
    textdecorationcolor: "",
    opacity: "",
    borderwidth: "",
    textdecorationthickness: "",
    borderstyle: "",
    textdecorationstyle: "",
}

const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

const getColorWithOpacity = (hexColor, opacity)=>{
    const rgb = hexToRgb(hexColor);
    const rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${opacity})`;
    return rgba;
}

loadPanels("colorPanel", colorPanel).then(()=>{

    for(let i = 0; i<=10; i++){
        colorPanel.children[1].children[i].addEventListener('click', (e)=>{
            color.style.backgroundColor = e.target.getAttribute('data-color');
            colorValue.innerHTML = e.target.getAttribute('data-color');

            const colorWithOpacity = getColorWithOpacity(e.target.getAttribute('data-color'), opacityValue.innerHTML);
            properties.color = colorWithOpacity;
            properties.bordercolor = colorWithOpacity;
            properties.textdecorationcolor = colorWithOpacity;
            properties.backgroundcolor = colorWithOpacity;
            chrome.runtime.sendMessage({type: "UPDATE_PROPERTIES", properties});
        })
    }
    const input = colorPanel.children[1].children[11];
    input.addEventListener("input", ()=>{
        color.style.backgroundColor = input.value;
        colorValue.innerHTML = input.value;
        properties.color = input.value;
        properties.bordercolor = input.value;
        properties.textdecorationcolor = input.value;
        properties.backgroundcolor = input.value;
        chrome.runtime.sendMessage({type: "UPDATE_PROPERTIES", properties});
    })
})

loadPanels("opacityPanel", opacityPanel).then(()=>{
    const input = opacityPanel.children[1].children[1];
    input.addEventListener("input", ()=>{
        opacity.style.opacity = `${input.value}%`;
        opacityValue.innerHTML = `${input.value}%`;

        const colorWithOpacity = getColorWithOpacity(colorValue.innerHTML, input.value/100);
        properties.color = colorWithOpacity;
        properties.bordercolor = colorWithOpacity;
        properties.textdecorationcolor = colorWithOpacity;
        properties.backgroundcolor = colorWithOpacity;
        properties.opacity = `${input.value}%`;
        chrome.runtime.sendMessage({type: "UPDATE_PROPERTIES", properties});
    })
});
panels.appendChild(colorPanel);
panels.appendChild(opacityPanel);

// for(let box of document.querySelector('annotator-toolbar').shadowRoot.querySelectorAll('.box')){
//     box.addEventListener('click',()=>{
//         const attributes
//     })
// }

// console.log(document.querySelector('annotator-toolbar').shadowRoot.querySelectorAll('.box'));

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type == "addNote") {
        const note = document.createElement('li');
        const text = document.createElement('textarea');
        note.appendChild(text);
        notesList.appendChild(note);

        text.addEventListener('change' , ()=>{if(text.value.trim()==='') notesList.removeChild(note)});
        
        const button = document.createElement('button');
        note.appendChild(button);
        note.style.position = "relative";
        button.style.position = "absolute";
        button.style.bottom = "1em";
        button.style.right = "0.8em";
        button.style.borderRadius = "0.4em";
        button.classList.add('edit');
        button.id = "save";

        text.addEventListener('input', ()=>{
            text.style.height = (text.scrollHeight) + 'px'
        });

        let buttonClicked = 0;

        text.addEventListener('focus', ()=>{
            if(text.value.trim()!==''){
                if(!buttonClicked) {
                    text.disabled = true;
                }
                else{
                    text.disabled = false;
                    buttonClicked = 0;
                }
            }
        })

        button.addEventListener('click', ()=>{
                buttonClicked = 1;
                text.disabled = false;
                text.focus();
                button.style.display = "none";
        })

        text.addEventListener('blur', ()=>{if(text.value.trim()!=='') button.style.display = "block"})

    }
})

const saveButton = document.querySelector('#save').addEventListener('click', ()=>{
    chrome.runtime.sendMessage({type:"saveAndShare"});
});