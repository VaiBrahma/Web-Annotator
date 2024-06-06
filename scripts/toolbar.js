const styled = ({ display = "none", left = 0, top = 0 }) => `
  #mediumHighlighter {
    align-items: center;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    z-index: 9999;
  }
`;

class Toolbar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get toolbarPosition() {
    return JSON.parse(this.getAttribute("toolbarPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  get highlightTemplate() {
    return this.shadowRoot.getElementById("highlightTemplate");
  }
  get rectangle() {
    return this.shadowRoot.getElementById("rectangle");
  }
  get circle() {
    return this.shadowRoot.getElementById("circle");
  }
  get underline() {
    return this.shadowRoot.getElementById("underline");
  }
  get fontColor() {
    return this.shadowRoot.getElementById("fontColor");
  }
  get fontSize() {
    return this.shadowRoot.getElementById("fontSize");
  }

  static get observedAttributes() {
    return ["toolbarPosition"];
  }

  async loadTemplate() {
    const response = await fetch(chrome.runtime.getURL('src/annotator-toolbar/annotator-toolbar.html'));
    const template = await response.text();
    this.shadowRoot.innerHTML += template;
  }
  
  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.loadTemplate().then(()=>{

      this.setIconImage("text-marker", "marker");
      this.setIconImage("rectangle", "rectangle");
      this.setIconImage("circle", "oval2");
      this.setIconImage("underline", "underline-tool");
      this.setIconImage("pointer", "pointer");
      this.setIconImage("note", "note");
      this.setIconImage("undo", "undo");
      this.setIconImage("redo", "redo");
      this.setIconImage("fontSize", "fontSize");
      this.setIconImage("fontColor", "fontColor");

      this.shadowRoot.querySelector(".text-marker").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.highlightTemplate.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      this.shadowRoot.querySelector(".rectangle").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.rectangle.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      this.shadowRoot.querySelector(".circle").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.circle.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      this.shadowRoot.querySelector(".underline").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.underline.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      this.shadowRoot.querySelector(".fontColor").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.fontColor.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })
      
      this.shadowRoot.querySelector(".fontSize").addEventListener("click", ()=>{
        var userSelection = window.getSelection();
        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.fontSize.cloneNode(true).content.firstElementChild;
          clone.appendChild(range.extractContents());
          range.insertNode(clone);
        }
        window.getSelection().empty();
      })

    });
    
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "toolbarPosition") {
      this.styleElement.textContent = styled(this.toolbarPosition);
    }
  }

  setIconImage(className, image) {
    const e = this.shadowRoot.querySelector(`.${className}`);
    e.style.background = `url(${chrome.runtime.getURL(`images/${image}.png`)}) no-repeat center center/cover`;
    e.style.filter = 'invert(100%)';
    e.style.backgroundSize = "80%";
  }

}

window.customElements.define("annotator-toolbar", Toolbar);
