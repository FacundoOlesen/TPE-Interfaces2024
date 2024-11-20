const img1 = document.querySelector(".block-rojo-1")
const img2 = document.querySelector(".block-naranja-2")
const img3 = document.querySelector(".block-amarillo-3")

document.addEventListener("DOMContentLoaded", function () {
    let yInicial = 550
    let topInicial = -120
    img1.style.bottom = yInicial
    img2.style.top = yInicial
    img3.style.top = topInicial
    let esperaLoader = 13000

    let i = 0

    setTimeout(() => {
        setInterval(function () {
            if (yInicial - i >= 130)
                img1.style.bottom = yInicial - i + "px";

            if (yInicial - i >= 275)
                img2.style.bottom = yInicial - i + "px";

            if (topInicial + i <= 323)
                img3.style.top = topInicial + i + "px";

            i++;
        }, 3)
    }, esperaLoader);
});
