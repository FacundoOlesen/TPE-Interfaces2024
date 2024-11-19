let stickyHeader = document.getElementById("header")
let nav = document.getElementById("nav")

window.addEventListener("scroll", function () {
    stickyHeader.classList.toggle("sticky", window.scrollY > 0)
    nav.classList.toggle("hide",  window.scrollY > 0)
})