let stickyHeader = document.getElementById("header")

window.addEventListener("scroll", function () {
    console.log(window.scrollY)
    stickyHeader.classList.toggle("sticky", window.scrollY > 0)
})