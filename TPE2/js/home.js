//Funcion para desplazamiento de titulos largos
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.juego-card h2').forEach((title) => {
        const tamañoTitulo = title.scrollWidth; 
        const tamañoContainer = title.clientWidth; 

        if (tamañoTitulo > tamañoContainer) {
            title.classList.add('scrolling'); 
        }
    });
});

const button = document.getElementById('enCarrito');
const originalImageSrc = 'img/encarrito.png'; // Ruta de la imagen original
const newImageSrc = 'img/quitarcarrito.png'; // Ruta de la nueva imagen

button.addEventListener('mouseenter', function() {
    const img = button.querySelector('img');
    img.src = newImageSrc; // Cambiar a la nueva imagen
});

button.addEventListener('mouseleave', function() {
    const img = button.querySelector('img');
    img.src = originalImageSrc; // Volver a la imagen original
});



