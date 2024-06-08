const old_properties = {
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

let updated_properties = old_properties;

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

function append(element, query, template){
  element.shadowRoot.querySelector(`.${query}`).addEventListener("click", ()=>{
    //to customize 
    for(let attr of template.attributes){
      const attrName = attr.name;

      if(updated_properties.hasOwnProperty(attrName)){
        template.setAttribute(attrName, updated_properties[attrName] || template.getAttribute(attrName));
        // console.log(attrName + " -> " + template.getAttribute(attrName));
      }
    }

    updated_properties = old_properties;
    //to append a highlight
    var userSelection = window.getSelection();
    for (let i = 0; i < userSelection.rangeCount; i++) {
      const range = userSelection.getRangeAt(i);
      const clone = template.cloneNode(true).content.firstElementChild;

      clone.style.backgroundColor = template.getAttribute('backgroundColor');
      clone.style.backgroundOpacity = template.getAttribute('opacity');
      clone.style.borderColor = template.getAttribute('borderColor');
      clone.style.borderWidth = template.getAttribute('borderWidth');
      clone.style.borderStyle = template.getAttribute('borderStyle');
      clone.style.textDecorationColor = template.getAttribute('textDecorationColor');
      clone.style.textDecorationStyle = template.getAttribute('textDecorationStyle');
      clone.style.textDecorationThickness = template.getAttribute('textDecorationThickness');
      clone.style.color = template.getAttribute('color');

      clone.appendChild(range.extractContents());
      range.insertNode(clone);
    }
    window.getSelection().empty();
  })
}