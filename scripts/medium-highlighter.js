const highlightColor = "rgb(213, 234, 255)";
const var1 = document.querySelector("#highlightTemplate");
const var2 = document.querySelector("#mediumHighlighter");
const template = `
    <template id="highlightTemplate">
        <span class="highlight" style="background-color: ${highlightColor}; display: inline;"></span>
    </template>

    <template id="rectangle">
        <span class="highlight" style="border: 2px solid red; display: inline;"></span>
    </template>

    <template id="circle">
        <span class="highlight" style="border: 2px solid red; border-radius: 50%; display: inline;"></span>
    </template>

    <template id="underline">
        <span class="highlight" style="text-decoration: underline; display: inline;"></span>
    </template>

    <button class="container" id="mediumHighlighter">
        <div class="box text-marker"></div>
        <div class="box rectangle"></div>
        <div class="box circle"></div>
        <div class="box underline"></div>
        <div class="box pointer"></div>
        <div class="box undo"></div>
        <div class="box redo"></div>
    </button>
`;
// const template = `
//   <template id="highlightTemplate">
//     <span class="highlight" style="background-color: ${highlightColor}; display: inline"></span>
//   </template>

//   <button id="mediumHighlighter">
//     <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512"><path d="M0 479.98L99.92 512l35.45-35.45-67.04-67.04L0 479.98zm124.61-240.01a36.592 36.592 0 0 0-10.79 38.1l13.05 42.83-50.93 50.94 96.23 96.23 50.86-50.86 42.74 13.08c13.73 4.2 28.65-.01 38.15-10.78l35.55-41.64-173.34-173.34-41.52 35.44zm403.31-160.7l-63.2-63.2c-20.49-20.49-53.38-21.52-75.12-2.35L190.55 183.68l169.77 169.78L530.27 154.4c19.18-21.74 18.15-54.63-2.35-75.13z"></path></svg>
//   </button>
// `;

const styled = ({ display = "none", left = 0, top = 0 }) => `
    *{
        box-sizing: border-box;
    }
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

    background-color: #050408;
    border-radius: 0.5em;
    padding: 0.25em 0.2em;
    transform-origin: 50% 110%;
    transition: all 0.1s ease-in-out;
    animation: tickle 0.5s ease-in-out;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }

  .box{
    height: 2.5em;
    width: 2.5em;
    background-color: #ffffff39;
    margin: 0.1em;
    border-radius: 0.25em;
}

.box:hover{
    background-color: #ffffff6a;
}

.container::after{
    content:"";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    width: 8px;
    height: 8px;
    background-color: rgb(0, 0, 0);
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
}

@keyframes tickle {
    0%{
        transform: scale(0);
    }
    10%{
        transform: scale(0.1) rotate(-6deg);
    }
    40%{
        transform: rotate(+5deg);
    }
    60%{
        transform: rotate(-3deg);
    }
    80%{
        transform: rotate(+2deg);
    }
    100%{
        transform: rotate(0deg);
    }
}

.box:active{
    transform: scale(0.95);
}
`;

class MediumHighlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
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

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += template;
    
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
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "markerPosition") {
      this.styleElement.textContent = styled(this.markerPosition);
    }
  }

  highlightSelection() {
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      this.highlightRange(userSelection.getRangeAt(i));
    }
    window.getSelection().empty();
  }

  highlightRange(range) {
    const clone =
      this.highlightTemplate.cloneNode(true).content.firstElementChild;
    clone.appendChild(range.extractContents());
    range.insertNode(clone);
  }

}

window.customElements.define("medium-highlighter", MediumHighlighter);
