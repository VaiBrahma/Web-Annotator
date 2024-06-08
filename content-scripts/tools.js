const appendTools = (element) => { 
      append(element, 'text-marker', element.highlightTemplate);
      append(element, 'rectangle', element.rectangle);
      append(element, 'circle', element.circle);
      append(element, 'underline', element.underline);
      append(element, 'fontColor', element.fontColor);
      append(element, 'fontSize', element.fontSize);
}

const setImages = (element) => {
  for(let box of element.shadowRoot.querySelectorAll('.box')){
    element.setIconImage(box.classList[1]);
  }
}

function append(element, query, classname){
  element.shadowRoot.querySelector(`.${query}`).addEventListener("click", ()=>{
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      const clone = classname.cloneNode(true).content.firstElementChild;
      clone.appendChild(range.extractContents());
      range.insertNode(clone);
    }
    window.getSelection().empty();
  })
}