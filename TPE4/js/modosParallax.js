let img = document.getElementById("modo-img");

// Array con las rutas de las imágenes que se cambiarán
const imagenes = [
    "./img/figura0.png",
    "./img/figura1.png",
    "./img/figura2.png",
    "./img/figura3.png",
    "./img/figura4.png",
    "./img/figura5.png",
    "./img/figura6.png",
    "./img/figura7.png",
    "./img/figura8.png",
    "./img/figura9.png",
    "./img/figura10.png",
];

window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY >= 3950 && scrollY <= 8800) {
        img.classList.add("stickyModo");
        img.classList.remove("sticky-final", "sticky-inicial");
        const index = Math.floor((scrollY - 3950) / 450) % imagenes.length;
        img.src = imagenes[index];

    } else if (scrollY > 8800) {
        img.classList.add("sticky-final");
        img.classList.remove("stickyModo", "sticky-inicial");
    } else {
        img.classList.add("sticky-inicial");
        img.classList.remove("stickyModo", "sticky-final");
    }
});
