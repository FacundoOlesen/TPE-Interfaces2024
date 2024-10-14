const nav = document.querySelector("#nav")
const abrir = document.querySelector(".hmb")
const body = document.querySelector("body")
const menu = document.querySelector(".menu-desp")
const main = document.querySelector(".main")
const mainhome = document.querySelector(".main-home")

const avatar = document.querySelector(".avatar")
const profile = document.querySelector(".profile")
const cj = document.querySelector(".cj")
const x = document.querySelector(".x")
const open = document.querySelector(".menu-hamburguesa")


abrir.addEventListener("click", () => {
    menu.classList.toggle("hide")
    body.classList.toggle("overflow")
    main.classList.toggle("active")
    main.classList.toggle("main")
    main.classList.toggle("main-helper")
})


open.addEventListener("click", () => {
    mainhome.classList.toggle("active")
    mainhome.classList.toggle("main-helper2")
})


avatar.addEventListener("click", () => {
    profile.classList.add("show")
    body.classList.add("overflow")
    body.classList.add("blur")
    avatar.classList.add("no-show")
    main.classList.add("active")
    profile.classList.add("slide")
})

x.addEventListener("click", () => {
    profile.classList.remove("show")
    avatar.classList.remove("no-show")
    body.classList.remove("overflow")
    body.classList.remove("blur")
    main.classList.remove("active")
    profile.classList.remove("slide")

})

const carrito = document.querySelector(".carrito")
const btncart = document.querySelector(".cart")

let cartAbierto= false
btncart.addEventListener("click", () => {
    carrito.classList.add("show")
    carrito.classList.add("slide")
    main.classList.add("active")
    btncart.classList.add("no-show")
    body.classList.add("overflow")
    body.classList.add("blur")
    cartAbierto= true
})


main.addEventListener("click", () => {
    if(cartAbierto){
        carrito.classList.remove("show")
        carrito.classList.remove("slide")
        main.classList.remove("active")
        body.classList.remove("overflow")
        btncart.classList.remove("no-show")
        cartAbierto=false
    }
})



