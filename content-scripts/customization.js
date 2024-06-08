const styledCustomize = ({ visibility = "hidden", left = 0, top = 0 }) => `
  #popupContainer {
    position: absolute;
    align-items: center;
    border: none;
    cursor: pointer;
    display: inline-flex;
    visibility : ${visibility};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    top: ${top}px;
    z-index: 9999;
  }
`;
class Customize extends HTMLElement {
    constructor(){
      super();
      this.render();
    }
  
    // get customizePosition() {
    //   return JSON.parse(this.getAttribute("customizePosition") || "{}");
    // }
  
    // static get observedAttributes() {
    //   return ["customizePosition"];
    // }
  
    // attributeChangedCallback(name, oldValue, newValue) {
    //   if (name === "customizePosition") {
    //     this.styleElement.textContent =  (this.customizePosition);
    //   }
    // }
  
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
          const panel = this.shadowRoot.querySelector('#popupContainer')
            box.addEventListener('mousedown', (e)=>{
              const offsetX = this.shadowRoot.querySelector('#popupContainer').getBoundingClientRect().width / 2;
              const offsetY = this.shadowRoot.querySelector('#popupContainer').getBoundingClientRect().height / 2;
              // const offsetY = 15 * 10;
              panel.style.top = `${e.clientY - offsetY}px`;
              panel.style.left = `${e.clientX - offsetX}px`;
              panel.style.visibility = "visible";
            });
            panel.addEventListener('click', ()=>{
              const panel = this.shadowRoot.querySelector('#popupContainer');
              panel.style.visibility = "hidden";
            });
            // console.log(typeof(box.classList[1]));
          }
      });
    }
  }
  window.customElements.define("customization-panel", Customize);