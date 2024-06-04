const button = document.querySelector("button")
const container = document.querySelector(".container")
button.addEventListener('click', ()=>{
    if(button.innerHTML == 'hide') {
        button.innerHTML = 'show';
        container.style.display = "none";
    }
    else {
        button.innerHTML = 'hide'; 
        container.style.display = "inline-flex";
    }




})