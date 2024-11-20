const loaderText = document.getElementById("loaderText");
const loaderCirculo = document.querySelector(".loader-circle");
const duracionAnimacion = 12;
const intervalTime = 100; 
const numeroMaximo = 100;
const header = document.querySelector("#header")

const figuras = [
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
];

function updateLoaderText() {
  let tiempoInicial = Date.now();
  let interval = setInterval(function () {
    let tiempoTranscurrido = (Date.now() - tiempoInicial) / 1000;
    let progreso = Math.min(tiempoTranscurrido / duracionAnimacion, 1);
    let numeroActual = Math.floor(progreso * numeroMaximo);

    if (numeroActual % 10 === 0) {
      let imageIndex = Math.floor(numeroActual / 10);
      loaderCirculo.style.backgroundImage = `url(${figuras[imageIndex]})`;
      loaderCirculo.style.backgroundSize = "contain";
      loaderCirculo.style.backgroundPosition = "center";
      loaderCirculo.style.filter = "brightness(1.1)";
    }

    loaderText.textContent = numeroActual + "%";

    if (numeroActual >= numeroMaximo) {
      clearInterval(interval);
      setInterval(() => {
        header.classList.add("sticky-header")
      }, 1000);
    }
  }, intervalTime);
}

document.addEventListener("DOMContentLoaded", function () {
  updateLoaderText();

  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, duracionAnimacion * 1000 + 1000);
});
