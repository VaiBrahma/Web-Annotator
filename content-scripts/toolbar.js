const styled = ({ display = "inline-flex",visibility = "hidden", left, top, animation = "none" }) => `
  #mediumHighlighter {
    align-items: center;
    border: none;
    cursor: pointer;
    justify-content: center;
    left: ${left}px;
    display: ${display};
    visibility: ${visibility};
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    z-index: 9999;
    animation: ${animation} 0.5s ease-in-out ;
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
  get note() {
    return this.shadowRoot.getElementById("note");
  }
  get toolbar() {
    return this;
  }

  static get observedAttributes() {
    return ["toolbarPosition"];
  }

  async loadTemplate() {
    const response = await fetch(chrome.runtime.getURL('src/annotator-toolbar/annotatorToolbar.html'));
    const template = await response.text();
    this.shadowRoot.innerHTML += template;
  }

  async getTemplate(clone){
    const response = await fetch(chrome.runtime.getURL("src/notes/notes.html"));
    const template = await response.text();
    clone.innerText = template;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "toolbarPosition") {
      this.styleElement.textContent = styled(this.toolbarPosition);
    }
  }


  setIconImage(className) {
    const e = this.shadowRoot.querySelector(`.${className}`);
    e.style.background = `url(${chrome.runtime.getURL(`images/${className}.png`)}) no-repeat center center/cover`;
    if(className!="circle") e.style.backgroundSize = "80%";
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);

    this.loadTemplate().then(()=>{
      setImages(this);
      appendTools(this);

      const button = this.shadowRoot.querySelector('.note');

      button.addEventListener('click', ()=>{
        console.log('clicked')
        var userSelection = window.getSelection();

        for (let i = 0; i < userSelection.rangeCount; i++) {
          const range = userSelection.getRangeAt(i);
          const clone = this.note.cloneNode(true).content.firstElementChild;
          
          this.getTemplate(clone).then(()=>{
            clone.appendChild(range.extractContents());
            range.insertNode(clone);
          });
        }
      });
    })
  };
}


window.customElements.define("annotator-toolbar", Toolbar);