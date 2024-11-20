const hamburgerButton = document.getElementById("hamburger-button");
const barraDeNav = document.getElementById("nav");
const header = document.getElementById("header");

hamburgerButton.addEventListener("click", function () {
    hamburgerButton.classList.toggle("transformed");
    barraDeNav.classList.toggle("visible");
    barraDeNav.classList.toggle("block");
    header.classList.toggle("visible");
});