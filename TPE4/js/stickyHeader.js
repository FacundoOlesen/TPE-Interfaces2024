let nav = document.getElementById("nav")
console.log(nav)

window.addEventListener("scroll", function () {
    nav.classList.toggle("hide",  window.scrollY > 0)
})