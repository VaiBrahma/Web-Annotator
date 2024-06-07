const appendTools = (element) => {
    element.shadowRoot.querySelector(".text-marker").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = element.highlightTemplate.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      element.shadowRoot.querySelector(".rectangle").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
           
        }
        window.getSelection().empty();
      })
      
      element.shadowRoot.querySelector(".circle").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = element.circle.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      element.shadowRoot.querySelector(".underline").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = element.underline.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      element.shadowRoot.querySelector(".fontColor").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = element.fontColor.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      element.shadowRoot.querySelector(".fontSize").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = element.fontSize.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })

      element.shadowRoot.querySelector(".note").addEventListener('mousedown' , ()=> {element.shadowRoot.querySelector(".fontSize").style.borderColor = "orange"});
      element.shadowRoot.querySelector(".note").addEventListener('mouseup' , ()=> {element.shadowRoot.querySelector(".fontSize").style.borderColor = "transparent"});

}

const setImages = (element) => {
    element.setIconImage("text-marker");
    element.setIconImage("rectangle");
    element.setIconImage("circle");
    element.setIconImage("underline");
    element.setIconImage("pointer");
    element.setIconImage("note");
    element.setIconImage("undo");
    element.setIconImage("redo");
    element.setIconImage("fontSize");
    element.setIconImage("fontColor");
}