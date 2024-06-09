const styledCustomize = ({ visibility = "hidden", left, top}) => `
  #popupContainer {
    position: absolute;
    align-items: center;
    border: none;
    cursor: pointer;
    display: inline-flex;
    visibility : ${visibility};
    justify-content: center;
    left: px;
    padding: 5px 10px;
    top: px;
    z-index: 9999;
  }
`;
class Customize extends HTMLElement {
    constructor(){
      super();
      this.render();
    }
  
    async loadTemplate() {
      const response = await fetch(chrome.runtime.getURL('src/customization-popup/popupContainer.html'));
      const template = await response.text();
      this.shadowRoot.innerHTML += template;
    }
  
    async loadPanels(fileName, element) {
      const response = await fetch(chrome.runtime.getURL(`src/customization-popup/panels/${fileName}.html`));
      const template = await response.text();
      element.innerHTML = template;
    }
  
    render(){
      this.attachShadow({mode: "open"});

      const style = document.createElement("style");
      style.textContent = styledCustomize({});
      this.shadowRoot.appendChild(style);

      this.loadTemplate().then(()=>{
        const panel = this.shadowRoot.querySelector('#popupContainer');
        const colorPanel = document.createElement('div');
        const opacityPanel = document.createElement('div');
        
        this.loadPanels("colorPanel", colorPanel);
        this.loadPanels("opacityPanel", opacityPanel);
        panel.appendChild(colorPanel);
        panel.appendChild(opacityPanel);
        
        for(let box of document.querySelector('annotator-toolbar').shadowRoot.querySelectorAll('.box')){

          box.addEventListener('click', (e)=>{
            const setposition = async () => {}
            const offsetX = this.shadowRoot.querySelector('#popupContainer').getBoundingClientRect().width / 2;
            const offsetY = this.shadowRoot.querySelector('#popupContainer').getBoundingClientRect().height;
            panel.style.top = `${e.clientY - offsetY}px`;
            panel.style.left = `${e.clientX - offsetX}px`;
            panel.style.visibility = "visible";
            panel.style.opacity = "1";
            panel.classList.add('animation');
          });
            
        }
        panel.addEventListener('click', ()=>{
          panel.style.visibility = "hidden";
          panel.style.opacity = "0";
          panel.classList.remove('animation');
        });
      });
    }
  }
  window.customElements.define("customization-panel", Customize);