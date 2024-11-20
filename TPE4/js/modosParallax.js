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

let imagenActual = -1;

window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY >= 3950 && scrollY <= 8800) {
        img.classList.add("stickyModo");
        img.classList.remove("sticky-final", "sticky-inicial");

        const nuevaImg = Math.floor((scrollY - 3950) / 450) % imagenes.length;

        if (nuevaImg !== imagenActual) {
            imagenActual = nuevaImg;

            img.classList.add("desvanecer");
            setTimeout(() => {
                img.src = imagenes[imagenActual];
                img.classList.remove("desvanecer");
            }, 500);
        }
    } else if (scrollY > 8800) {
        img.classList.add("sticky-final");
        img.classList.remove("stickyModo", "sticky-inicial");
    } else {
        img.classList.add("sticky-inicial");
        img.classList.remove("stickyModo", "sticky-final");
    }
});
