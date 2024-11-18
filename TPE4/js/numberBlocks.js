const seccionDescarga = document.getElementById("seccion-descarga");
const figurasDescarga = document.querySelector(".figuras-descarga").querySelector("img");

// definimos el tamaño de la seccion
const seccionWidth = window.innerWidth;
const seccionHeight = window.innerHeight;

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const xOffset = (mouseX / seccionWidth) * 2; 
    const yOffset = (mouseY / seccionHeight) * 2;

    const maxMovement = 30;
    figurasDescarga.style.transform = `translate(${xOffset * -maxMovement}px, ${yOffset * -maxMovement}px)`;
});
