const nav = document.querySelector("#nav")
const abrir = document.querySelector(".hmb")
const body = document.querySelector("body")
const menu = document.querySelector(".menu-desp")
const main = document.querySelector(".main")


abrir.addEventListener("click", () =>{
    menu.classList.toggle("hide")
    body.classList.toggle("blur")
    body.classList.toggle("overflow")
    main.classList.toggle("active")

    main.classList.toggle("main")
    main.classList.toggle("main-helper")
})

