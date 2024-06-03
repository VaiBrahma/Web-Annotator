const input = document.querySelectorAll("input")
const ans = document.getElementsByClassName("answer");
const button = document.querySelector("button");

button.addEventListener("click", ()=>{
    let value1 = Number.parseInt(input[0].value);
    let value2 = Number.parseInt(input[1].value);
    ans[0].innerHTML = value1 + value2;
})
