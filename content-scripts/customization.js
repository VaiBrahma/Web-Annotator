const styledCustomize = ({ display = "none", left = 0, top = 0 }) => `
  #popupContainer {
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
class Customize extends HTMLElement {
    constructor(){
      super();
      this.render();
    }
  
    get customizePosition() {
      return JSON.parse(this.getAttribute("customizePosition") || "{}");
    }
  
    static get observedAttributes() {
      return ["customizePosition"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "customizePosition") {
        this.styleElement.textContent =  (this.customizePosition);
      }
    }
  
    async loadTemplate() {
      const response = await fetch(chrome.runtime.getURL('src/customization-popup/popupContainer.html'));
      const template = await response.text();
      this.shadowRoot.innerHTML += template;
    }
  
    render(){
      this.attachShadow({mode: "open"});

      const style = document.createElement("style");
      style.textContent = styledCustomize({});
      this.shadowRoot.appendChild(style);

      this.loadTemplate().then(()=>{
        for(let box of document.querySelector('annotator-toolbar').shadowRoot.querySelectorAll('.box')){
            // box.addEventListener('mousedown', ()=>{this.shadowRoot.querySelector('#popupContainer').style.display = "inline-flex"});
            // box.addEventListener('mouseup', ()=>{this.shadowRoot.querySelector('#popupContainer').style.display = "none"});
            console.log(typeof(box.classList[1]));
          }
      });
    }
  }
  window.customElements.define("customization-panel", Customize);