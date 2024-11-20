
const containerMain = document.querySelector(".seccion-inicio");

const seccionArbolIzq = document.getElementById("seccion-arbol-izq");
const seccionArbolDer = document.getElementById("seccion-arbol-der");
const seccionArbolDerChico = document.getElementById("seccion-arbol-der-chico");

const arbusto1 = document.getElementById("arbusto1");
const arbusto2 = document.getElementById("arbusto2");
const arbusto3 = document.getElementById("arbusto3");
const arbusto4 = document.getElementById("arbusto4");

const piedra1 = document.getElementById("piedra1");
const piedra2 = document.getElementById("piedra2");
const piedra3 = document.getElementById("piedra3");
const piedra4 = document.getElementById("piedra4");

const elipse1 = document.getElementById("elipse1");
const elipse2 = document.getElementById("elipse2");
const elipse3 = document.getElementById("elipse3");

const blockRojo1 = document.getElementById("block-rojo-1");
const blockNaranja2 = document.getElementById("block-naranja-2");
const blockAmarillo3 = document.getElementById("block-amarillo-3");

const seccionFigura5 = document.getElementById("seccion-figura5");
const seccionFigura4 = document.getElementById("seccion-figura4");

window.addEventListener("scroll", function () {
  let y = window.scrollY;
  arbusto1.style.left = 200 - y * 0.4 + "px";
  arbusto2.style.left = 120 - y * 0.3 + "px";
  arbusto3.style.right = 0 - y * 0.2 + "px";
  arbusto4.style.right = 60 - y * 0.2 + "px";
  piedra1.style.left = 130 - y * 0.2 + "px";
  piedra2.style.right = 170 - y * 0.2 + "px";
  piedra3.style.right = 90 - y * 0.2 + "px";
  piedra4.style.right = 170 - y * 0.2 + "px";
  seccionArbolIzq.style.left = 0 - y * 0.2 + "px";
  seccionArbolDer.style.right = 0 - y * 0.20 + "px";
  seccionArbolDerChico.style.right = 0 - y * 0.20 + "px";

  blockRojo1.style.bottom = 130 + y * 0.4 + "px";
  blockNaranja2.style.bottom = 275 - y * 0.25 + "px";
  blockAmarillo3.style.top = 323 - y * 0.3 + "px";
  blockAmarillo3.style.left = 710.25 + y * 0.15 + "px";

  elipse2.style.bottom = 176 - y * 0.05 + "px";
  elipse3.style.right = 380 - y * 0.2 + "px";

  seccionFigura5.style.right = -79 + y * 0.02 + "px";
  seccionFigura5.style.top = -100 - y * 0.05 + "px";

  seccionFigura4.style.left = 48 + y * 0.06 + "px";
});


