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
    const response = await fetch(chrome.runtime.getURL('src/annotator-toolbar/annotatorToolbar.html'));
    const template = await response.text();
    this.shadowRoot.innerHTML += template;
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
    });
    
  }
}

window.customElements.define("annotator-toolbar", Toolbar);
