const button = document.querySelector('button');
button.addEventListener('click', ()=>{
    const mainPage = "../src/sidePanel/main/sidePanel.html";
    chrome.sidePanel.setOptions({ path: mainPage});      
})